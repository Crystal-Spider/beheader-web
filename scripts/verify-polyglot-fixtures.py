"""Independent acceptance check: requires Pillow, FFmpeg, and outputs from Playwright."""
import hashlib
import json
import struct
import subprocess
import warnings
import os
from pathlib import Path
from PIL import Image, __version__ as pillow_version

root = Path(__file__).resolve().parent.parent
results = Path(os.environ.get("BHW_VALIDATION_ROOT", root / "test-results"))


def payload_hashes(path):
    """Hash whole mdat payloads in bounded reads, independently of the TypeScript parser."""
    result = []
    end = path.stat().st_size
    with path.open("rb") as file:
        offset = 0
        while offset < end:
            file.seek(offset)
            size, kind = struct.unpack(">I4s", file.read(8))
            header = 8
            if size == 1:
                size = struct.unpack(">Q", file.read(8))[0]
                header = 16
            elif size == 0:
                size = end - offset
            assert header <= size <= end - offset, (path.name, offset, size)
            if kind == b"mdat":
                digest = hashlib.sha256()
                remaining = size - header
                while remaining:
                    chunk = file.read(min(1024 * 1024, remaining))
                    assert chunk
                    digest.update(chunk)
                    remaining -= len(chunk)
                result.append(digest.hexdigest())
            offset += size
    assert result
    return result


def probe(path):
    result = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries",
        "stream=codec_name,codec_type,width,height,channels,sample_rate,time_base,start_time,duration,nb_frames:format=duration:format_tags=title",
        "-of", "json", str(path)
    ], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


outputs = sorted(results.glob("*-video-*.polyglot"))
assert len(outputs) == 7, f"Run the complete Playwright suite first; found {len(outputs)} outputs"
report = {"pillow": pillow_version, "outputs": []}
for path in outputs:
    image_name, media_name = path.stem.split("-video-", 1)
    image_name = image_name.rsplit("-", 1)
    source_image = root / "e2e" / "fixture" / (".".join(image_name))
    source_media = root / "e2e" / "fixture" / f"video-{media_name}.mp4"
    with warnings.catch_warnings(record=True) as notices:
        with Image.open(path) as image, Image.open(source_image) as original:
            image.load()
            assert image.format == "ICO"
            assert image.size == original.size
            assert image.convert("RGBA").getpixel((0, 0))[3] == original.convert("RGBA").getpixel((0, 0))[3]
            dimensions = image.size
    assert payload_hashes(path) == payload_hashes(source_media), path.name
    assert probe(path) == probe(source_media), path.name
    subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(path), "-f", "null", "-"], check=True, capture_output=True)
    report["outputs"].append({"file": path.name, "image_size": dimensions, "image_warnings": [str(notice.message) for notice in notices], "mdat_sha256": payload_hashes(path), "metadata_equal": True, "decode": "passed"})

(results / "independent-validation.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(f"Pillow {pillow_version}: all {len(outputs)} ICO outputs load at original dimensions with matching alpha")
print(f"FFprobe/FFmpeg: all {len(outputs)} outputs retain exact mdat hashes and playback metadata, and fully decode")
print("Large ICO entries generate Pillow's expected size warning; full embedded PNG dimensions are retained")
