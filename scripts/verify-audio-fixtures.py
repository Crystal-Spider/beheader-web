"""Independent AAC acceptance for the tiny original fixtures: FFprobe/FFmpeg and optional interpretations."""
from array import array
import hashlib
import json
import math
import os
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import zipfile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "e2e" / "fixture"
RESULTS = ROOT / "test-results"


def probe(path):
    return json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)], check=True, capture_output=True).stdout)


def aac_packets(path):
    """Normalize the container only, then hash raw AAC access units without ADTS headers."""
    encoded = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", "-"], check=True, capture_output=True).stdout
    hashes = []
    offset = 0
    while offset < len(encoded):
        assert encoded[offset] == 255 and encoded[offset + 1] & 0xF6 == 0xF0
        header = 7 if encoded[offset + 1] & 1 else 9
        length = ((encoded[offset + 3] & 3) << 11) | (encoded[offset + 4] << 3) | (encoded[offset + 5] >> 5)
        assert header <= length <= len(encoded) - offset
        hashes.append(hashlib.sha256(encoded[offset + header:offset + length]).hexdigest())
        offset += length
    return hashes


def pdf_pixels(path, name):
    suffix = ".exe" if os.name == "nt" else ""
    poppler = Path(shutil.which("pdftoppm") or "pdftoppm").parent / f"pdftoppm{suffix}"
    directory = RESULTS / "audio-render"
    directory.mkdir(exist_ok=True)
    prefix = directory / name
    result = subprocess.run([str(poppler), "-singlefile", "-scale-to", "600", "-png", str(path), str(prefix)], check=True, capture_output=True)
    assert all(line.startswith(b"Syntax Error: No display font for '") for line in result.stderr.splitlines()), result.stderr
    with Image.open(prefix.with_suffix(".png")) as image:
        return hashlib.sha256(image.tobytes()).hexdigest()


def tone_frequency(samples):
    """Measure the dominant tone away from codec priming/padding; tiny ringing can add zero crossings."""
    window = samples[12000:36000]
    powers = {}
    for frequency in range(400, 482, 2):
        coefficient = 2 * math.cos(2 * math.pi * frequency / 48000)
        previous = before_previous = 0.0
        for sample in window:
            value = sample + coefficient * previous - before_previous
            before_previous, previous = previous, value
        powers[frequency] = previous**2 + before_previous**2 - coefficient * previous * before_previous
    return max(powers, key=powers.get)


report = []
source_pdf = pdf_pixels(FIXTURES / "classic.pdf", "source")
with zipfile.ZipFile(FIXTURES / "first.zip") as archive:
    expected_zip = {entry.filename: archive.read(entry) for entry in archive.infolist()}
for engine in ["chromium", "firefox"]:
    directory = RESULTS / "audio" / engine
    outputs = sorted(directory.glob("*.polyglot"))
    assert len(outputs) == 11, (engine, len(outputs))
    for output in outputs:
        original_name = output.name.removesuffix(".polyglot").removesuffix("-all-families")
        original = FIXTURES / original_name
        data = probe(output)
        streams = data["streams"]
        assert len(streams) == 1 and streams[0]["codec_name"] == "aac" and streams[0]["profile"] == "LC", (output, streams)
        track = streams[0]
        channels = 6 if "surround" in original_name else 2 if original_name in ["audio-stereo.wav", "audio-float.wav"] else 1
        assert track["channels"] == channels and int(track["sample_rate"]) == 48000
        duration = float(data["format"]["duration"])
        assert abs(duration - float(probe(original)["format"]["duration"])) < 0.15, (output, duration)
        raw = subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(output), "-map", "0:a:0", "-f", "f32le", "-c:a", "pcm_f32le", "-"], check=True, capture_output=True).stdout
        samples = array("f")
        samples.frombytes(raw)
        if sys.byteorder != "little":
            samples.byteswap()
        channel = samples[::channels]
        assert all(math.isfinite(value) for value in channel)
        rms = math.sqrt(sum(value * value for value in channel) / len(channel))
        assert 0.02 < rms < 0.2, (output, rms)
        frequency = tone_frequency(channel)
        assert abs(frequency - 440) <= 2, (output, frequency)
        copied = original_name.endswith(".m4a") or original_name == "audio.aac"
        if copied:
            assert aac_packets(output) == aac_packets(original), output
        if "all-families" in output.name:
            with Image.open(output) as image:
                image.load()
                assert image.size == (32, 24) and image.convert("RGBA").getpixel((0, 0))[3] == 128
            assert pdf_pixels(output, engine) == source_pdf
            with zipfile.ZipFile(output) as archive:
                assert {entry.filename: archive.read(entry) for entry in archive.infolist()} == expected_zip
                with output.open("rb") as stream:
                    stream.seek(max(0, output.stat().st_size - 65557))
                    tail = stream.read()
                end = tail.rfind(b"PK\x05\x06")
                length, offset = struct.unpack_from("<II", tail, end + 12)
                comment = struct.unpack_from("<H", tail, end + 20)[0]
                assert offset + length == output.stat().st_size - 22 - comment
        report.append({"engine": engine, "fixture": original_name, "all_families": "all-families" in output.name, "profile": "AAC-LC", "channels": channels, "sample_rate": 48000, "duration": duration, "rms": rms, "tone_hz": frequency, "encoded_packets_preserved": copied})
(RESULTS / "audio-validation.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(f"All {len(report)} audio outputs: AAC-LC, expected channels/duration, full decode, and retained 440 Hz tone")
print("Compatible M4A/ADTS AAC access units are unchanged; both all-family outputs retain image, PDF, and ZIP behavior")
print("Windows WebKit runner is excluded from output acceptance by reviewed platform limitation; inspect its capabilities report")
