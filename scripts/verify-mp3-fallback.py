"""Validate WASM-decoded MP3 artifacts with independent FFmpeg readers."""
from array import array
from pathlib import Path
import json
import math
import subprocess
import sys


def probe(path):
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)
    ]))


def samples(path):
    raw = subprocess.check_output([
        "ffmpeg", "-v", "error", "-xerror", "-i", str(path), "-map", "0:a:0",
        "-f", "f32le", "-c:a", "pcm_f32le", "-"
    ])
    values = array("f")
    values.frombytes(raw)
    if sys.byteorder != "little":
        values.byteswap()
    assert all(math.isfinite(value) for value in values)
    return values


report = []
for engine in ["chromium", "firefox"]:
    directory = Path("test-results/mp3-fallback") / engine
    for name, channels, rate in [("audio.mp3", 1, 48000), ("audio-stereo.mp3", 2, 48000), ("audio-low-rate.mp3", 1, 22050)]:
        path = directory / (name + ".polyglot")
        metadata = probe(path)
        track, = metadata["streams"]
        assert track["codec_name"] == "aac" and track["profile"] == "LC", path
        assert track["channels"] == channels and int(track["sample_rate"]) == rate, path
        duration = float(metadata["format"]["duration"])
        original = Path("e2e/fixture") / name
        assert abs(duration - float(probe(original)["format"]["duration"])) < 0.15, path
        decoded = samples(path)
        planes = [decoded[channel::channels] for channel in range(channels)]
        rms = [math.sqrt(sum(value * value for value in plane) / len(plane)) for plane in planes]
        assert all(0.02 < value < 0.2 for value in rms), (path, rms)
        if channels == 2:
            assert 1.8 < rms[0] / rms[1] < 2.2, (path, rms)
        # Compare tone energy with an independent MP3 decode, away from priming/padding.
        reference = samples(original)[::channels]
        start, end = rate // 4, rate
        source_rms = math.sqrt(sum(value * value for value in reference[start:end]) / (end - start))
        output_rms = math.sqrt(sum(value * value for value in planes[0][start:end]) / (end - start))
        assert 0.9 < output_rms / source_rms < 1.1, path
        # The frequency has its strongest correlation near the original synthetic 440 Hz.
        window = planes[0][start:end]
        powers = {}
        for frequency in range(436, 445, 2):
            coefficient = 2 * math.cos(2 * math.pi * frequency / rate)
            previous = before_previous = 0.0
            for sample in window:
                value = sample + coefficient * previous - before_previous
                before_previous, previous = previous, value
            powers[frequency] = previous**2 + before_previous**2 - coefficient * previous * before_previous
        assert max(powers, key=powers.get) == 440, path
        report.append({"engine": engine, "fixture": name, "channels": channels, "sampleRate": rate, "duration": duration, "outcome": "pass"})
Path("test-results/mp3-fallback/independent-validation.json").write_text(json.dumps(report, indent=2) + "\n")
print(f"Independent MP3 fallback validation: {len(report)} artifacts passed")
