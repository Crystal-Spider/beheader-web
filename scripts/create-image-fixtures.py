"""Regenerate original test images with Pillow; not an application dependency."""
from pathlib import Path
from PIL import Image

directory = Path(__file__).resolve().parent.parent / "e2e" / "fixture"
directory.mkdir(parents=True, exist_ok=True)
image = Image.new("RGBA", (32, 24), (0, 0, 0, 0))
image.paste((255, 0, 0, 128), (0, 0, 16, 24))
image.paste((0, 255, 0, 255), (16, 0, 32, 24))
image.save(directory / "transparent.png")
image.save(directory / "static.webp", lossless=True)
image.convert("RGB").save(directory / "static.jpg", quality=90)
image.convert("RGB").save(directory / "static.bmp")
image.convert("P").save(directory / "static.gif")
second = Image.new("RGBA", image.size, (0, 0, 255, 255))
for extension in ("png", "webp", "gif", "tiff"):
    image.save(directory / f"animated.{extension}", save_all=True, append_images=[second], duration=100, loop=0)
image.save(directory / "static.tiff")
Image.new("RGBA", (320, 240), (20, 100, 200, 128)).save(directory / "large-dimensions.png")
