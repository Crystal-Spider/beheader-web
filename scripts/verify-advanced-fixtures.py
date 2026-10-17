"""Independently validate the all-family artifact with bundled local HTML assets."""
import runpy
import os
from pathlib import Path
import subprocess
import zipfile
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
checks = runpy.run_path(str(ROOT / 'scripts' / 'verify-combinations.py'))
path = Path(os.environ.get('BHW_VALIDATION_ROOT', ROOT / 'test-results')) / 'advanced' / 'all.polyglot'
fixtures = ROOT / 'e2e' / 'fixture'
with Image.open(path) as image:
    image.load()
    assert image.size == (32, 24)
    assert image.convert('RGBA').getpixel((0, 0))[3] == 128
assert checks['mdat_hashes'](path) == checks['mdat_hashes'](fixtures / 'video-aac.mp4')
subprocess.run(['ffmpeg', '-v', 'error', '-xerror', '-i', str(path), '-f', 'null', '-'], check=True, capture_output=True)
assert checks['render'](path, 'advanced') == checks['expected_pdf']
with zipfile.ZipFile(path) as archive:
    assert {entry.filename: archive.read(entry) for entry in archive.infolist()} == checks['expected_zip']
    checks['verify_zip_offsets'](path, archive)
print('Bundled HTML artifact retains independent image, media, PDF, and ZIP interpretations')
