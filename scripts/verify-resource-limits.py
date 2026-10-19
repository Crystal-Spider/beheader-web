"""Independently validate the streamed large HTML asset, PDF and ZIP interpretations."""
from pathlib import Path
import base64
import hashlib
import json
import os
import subprocess
import zipfile
from PIL import Image

root = Path(__file__).resolve().parents[1]
results = Path(os.environ.get("BHW_VALIDATION_ROOT", root / "test-results"))
directory = results / "resource-limits"
artifact = directory / "large-resources.polyglot"
expected_size = 64 * 1024 * 1024 + 5
marker = b"data:application/octet-stream;base64,"
with artifact.open("rb") as stream:
    head = stream.read(4096)
    start = head.index(marker) + len(marker)
    stream.seek(start)
    digest = hashlib.sha256()
    size = 0
    pending = b""
    while True:
        chunk = stream.read(65536)
        assert chunk, "Truncated base64 resource"
        last = b'"' in chunk
        if last:
            chunk = chunk.split(b'"', 1)[0]
        pending += chunk
        count = len(pending) if last else len(pending) - len(pending) % 4
        decoded = base64.b64decode(pending[:count], validate=True)
        digest.update(decoded)
        size += len(decoded)
        pending = pending[count:]
        if last:
            assert not pending
            break
assert size == expected_size, size
expected = hashlib.sha256()
block = bytes(range(251)) * 4096
remaining = size
while remaining:
    count = min(remaining, len(block))
    expected.update(block[:count])
    remaining -= count
assert digest.digest() == expected.digest(), "Asset payload differs"

with zipfile.ZipFile(artifact) as archive:
    entries = archive.infolist()
    assert len(entries) == 5000 and all(entry.is_dir() for entry in entries)
    assert {entry.filename for entry in entries} == {f"{index}-{'x' * 200}/" for index in range(5000)}
    assert archive.testzip() is None

def render(path, name):
    prefix = directory / name
    subprocess.run(["pdftoppm", "-singlefile", "-scale-to", "600", "-png", str(path), str(prefix)], check=True, capture_output=True)
    with Image.open(prefix.with_suffix(".png")) as image:
        return image.size, hashlib.sha256(image.tobytes()).hexdigest()

assert render(artifact, "output") == render(root / "e2e/fixture/classic.pdf", "source"), "PDF pixels differ"
info = subprocess.run(["pdfinfo", str(artifact)], check=True, capture_output=True)
assert b"Pages:           1" in info.stdout
report = {"assetBytes": size, "assetSha256": digest.hexdigest(), "archiveEntries": 5000, "pdfXrefRecords": 60000, "pdfPixelsMatch": True}
(directory / "independent-validation.json").write_text(json.dumps(report, indent=2) + "\n")
print("Large HTML asset SHA-256, 5,000 ZIP entries and PDF page pixels match")
