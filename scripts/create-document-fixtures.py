"""Create original, redistributable PDF/ZIP fixtures using Python's standard library."""
from pathlib import Path
import struct
import zipfile
import random

ROOT = Path(__file__).resolve().parents[1] / "e2e" / "fixture"


def pdf(subsections=False, crlf=False, trailer_extra=""):
    newline = b"\r\n" if crlf else b"\n"
    data = bytearray(b"%PDF-1.4" + newline)
    offsets = [0]
    stream = b"BT /F1 18 Tf 40 100 Td (Beheader Web PDF fixture) Tj ET\n"
    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 160] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"endstream",
    ]
    for number, body in enumerate(objects, 1):
        offsets.append(len(data))
        data += f"{number} 0 obj".encode() + newline + body + newline + b"endobj" + newline
    xref = len(data)
    data += b"xref" + newline
    groups = [(0, 3), (3, 3)] if subsections else [(0, 6)]
    for first, count in groups:
        data += f"{first} {count}".encode() + newline
        for number in range(first, first + count):
            record = f"{offsets[number]:010} {65535 if number == 0 else 0:05} {'f' if number == 0 else 'n'}".encode()
            data += record + (b"\r\n" if crlf else b" \n")
    data += b"trailer" + newline + f"<< /Size 6 /Root 1 0 R {trailer_extra}>>".encode() + newline
    data += b"startxref" + newline + str(xref).encode() + newline + b"%%EOF" + newline
    return bytes(data)


(ROOT / "classic.pdf").write_bytes(pdf())
(ROOT / "subsections.pdf").write_bytes(pdf(subsections=True, crlf=True))
(ROOT / "incremental.pdf").write_bytes(pdf(trailer_extra="/Prev 9 "))
(ROOT / "encrypted.pdf").write_bytes(pdf(trailer_extra="/Encr#79pt 7 0 R "))
for name, items in [
    ("first.zip", {"shared.txt": "earlier", "nested/città.txt": "Città, 日本語, 🙂", "empty/": "", "binary.bin": bytes(range(256))}),
    ("second.zip", {"shared.txt": "later", "second.txt": "second", "tail.bin": random.Random(0).randbytes(128 * 1024)}),
    ("unsafe.zip", {"../escape.txt": "no"}),
    ("empty.zip", {}),
    ("large-expanded.zip", {"large.txt": b"x" * (2 * 1024**2)}),
]:
    with zipfile.ZipFile(ROOT / name, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path, value in items.items():
            info = zipfile.ZipInfo(path, (2026, 1, 1, 0, 0, 0))
            # Empty directories use STORE; nonempty files exercise DEFLATE.
            info.compress_type = zipfile.ZIP_STORED if path.endswith("/") else zipfile.ZIP_DEFLATED
            archive.writestr(info, value.encode("utf-8") if isinstance(value, str) else value)

raw = bytearray((ROOT / "first.zip").read_bytes())
central = raw.index(b"PK\x01\x02")
struct.pack_into("I", raw, central + 24, 1024**3)
(ROOT / "oversized-expanded.zip").write_bytes(raw)
raw = bytearray((ROOT / "first.zip").read_bytes())
raw[central + 8] |= 1
(ROOT / "encrypted.zip").write_bytes(raw)
raw = bytearray((ROOT / "first.zip").read_bytes())
struct.pack_into("H", raw, len(raw) - 22 + 4, 1)
(ROOT / "split.zip").write_bytes(raw)
raw = bytearray((ROOT / "first.zip").read_bytes())
raw[40] ^= 0x20
(ROOT / "corrupt.zip").write_bytes(raw)
raw = bytearray((ROOT / "large-expanded.zip").read_bytes())
central = raw.index(b"PK\x01\x02")
struct.pack_into("I", raw, 22, 1)
struct.pack_into("I", raw, central + 24, 1)
(ROOT / "dishonest-expanded.zip").write_bytes(raw)
raw = bytearray((ROOT / "first.zip").read_bytes())
central = raw.index(b"PK\x01\x02")
struct.pack_into("I", raw, 14, 0)
struct.pack_into("I", raw, central + 16, 0)
(ROOT / "crc-mismatch.zip").write_bytes(raw)
with zipfile.ZipFile(ROOT / "unsupported-method.zip", "w", compression=zipfile.ZIP_BZIP2) as archive:
    archive.writestr("file.txt", "unsupported method")
