"""Independent output acceptance: Python zipfile, Pillow, Poppler, and FFmpeg."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import struct
import subprocess
import zipfile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "test-results" / "combinations"
FIXTURES = ROOT / "e2e" / "fixture"
RENDERS = ROOT / "test-results" / "pdf-render"
RENDERS.mkdir(parents=True, exist_ok=True)
POPPLER = Path(shutil.which("pdftoppm") or "pdftoppm").parent


def render(path, name):
    suffix = ".exe" if os.name == "nt" else ""
    info = subprocess.run([str(POPPLER / f"pdfinfo{suffix}"), str(path)], check=True, capture_output=True)
    assert b"Pages:           1" in info.stdout, info.stdout
    assert not info.stderr, info.stderr
    prefix = RENDERS / name
    result = subprocess.run([str(POPPLER / f"pdftoppm{suffix}"), "-singlefile", "-scale-to", "600", "-png", str(path), str(prefix)], check=True, capture_output=True)
    # This bundled Poppler reports unavailable optional system font aliases even for the source fixture.
    assert all(line.startswith(b"Syntax Error: No display font for '") for line in result.stderr.splitlines()), result.stderr
    with Image.open(prefix.with_suffix(".png")) as image:
        return hashlib.sha256(image.tobytes()).hexdigest()


def mdat_hashes(path):
    hashes = []
    with path.open("rb") as stream:
        end = path.stat().st_size
        offset = 0
        while offset < end:
            stream.seek(offset)
            size, kind = struct.unpack(">I4s", stream.read(8))
            header = 8
            if size == 1:
                size = struct.unpack(">Q", stream.read(8))[0]
                header = 16
            elif size == 0:
                size = end - offset
            assert header <= size <= end - offset
            if kind == b"mdat":
                digest = hashlib.sha256()
                remaining = size - header
                while remaining:
                    chunk = stream.read(min(1024**2, remaining))
                    assert chunk
                    digest.update(chunk)
                    remaining -= len(chunk)
                hashes.append(digest.hexdigest())
            offset += size
    return hashes


def verify_zip_offsets(path, archive):
    """Inspect serialized fields before zipfile's self-extracting-offset recovery can hide a bad writer."""
    with path.open("rb") as stream:
        stream.seek(max(0, path.stat().st_size - 65557))
        tail = stream.read()
        end = tail.rfind(b"PK\x05\x06")
        assert end >= 0
        directory_size, directory_offset = struct.unpack_from("<II", tail, end + 12)
        comment_length = struct.unpack_from("<H", tail, end + 20)[0]
        assert directory_offset + directory_size == path.stat().st_size - 22 - comment_length
        stream.seek(directory_offset)
        for entry in archive.infolist():
            record = stream.read(46)
            assert record[:4] == b"PK\x01\x02"
            stored_offset = struct.unpack_from("<I", record, 42)[0]
            assert stored_offset == entry.header_offset
            next_record = stream.tell() + sum(struct.unpack_from("<HHH", record, 28))
            stream.seek(stored_offset)
            assert stream.read(4) == b"PK\x03\x04"
            stream.seek(next_record)


expected_pdf = render(FIXTURES / "classic.pdf", "source")
with zipfile.ZipFile(FIXTURES / "first.zip") as archive:
    expected_zip = {entry.filename: archive.read(entry) for entry in archive.infolist()}
outputs = sorted(OUTPUT.glob("*.polyglot"))
assert len(outputs) == 26, f"Expected 26 matrix outputs; got {len(outputs)}"
report = []
for path in outputs:
    families = path.stem.split("-")
    checks = {}
    if "pdf" in families:
        checks["pdf_render_equal"] = render(path, path.stem) == expected_pdf
        assert checks["pdf_render_equal"], path.name
    if "archive" in families:
        with zipfile.ZipFile(path) as archive:
            assert archive.testzip() is None
            assert {entry.filename: archive.read(entry) for entry in archive.infolist()} == expected_zip
            verify_zip_offsets(path, archive)
        checks["zip_content_equal"] = True
    if "media" in families:
        assert mdat_hashes(path) == mdat_hashes(FIXTURES / "video-aac.mp4")
        subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"], check=True, capture_output=True)
        checks["media_payload_equal_and_decoded"] = True
    if "image" in families:
        with Image.open(path) as image:
            image.load()
            assert image.size == (32, 24)
            assert image.convert("RGBA").getpixel((0, 0))[3] == 128
        checks["ico_dimensions_and_alpha"] = True
    report.append({"families": families, "checks": checks})
(ROOT / "test-results" / "combination-validation.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(f"All {len(outputs)} combinations passed independent interpretation checks")
for name, order in [("selected", ["first.zip", "second.zip"]), ("reversed", ["second.zip", "first.zip"])]:
    path = ROOT / "test-results" / "archive-order" / f"{name}.polyglot"
    expected = {}
    for archive_name in order:
        with zipfile.ZipFile(FIXTURES / archive_name) as archive:
            expected.update({entry.filename: archive.read(entry) for entry in archive.infolist()})
    with zipfile.ZipFile(path) as archive:
        assert {entry.filename: archive.read(entry) for entry in archive.infolist()} == expected
        assert b"startxref" in archive.comment
        verify_zip_offsets(path, archive)
    assert render(path, name) == expected_pdf
print("Both archive orders retain exact merged contents and identical PDF rendering after a ZIP suffix over 128 KiB")
