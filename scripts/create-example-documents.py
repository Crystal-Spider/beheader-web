"""Create original, deterministic localized HTML/PDF/ZIP examples with the standard library."""
from html import escape
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets" / "example"
CONTENT = json.loads(Path(__file__).with_name("example-content.json").read_text(encoding="utf-8"))


def pdf_literal(text):
    """Helvetica with WinAnsi encoding covers the examples' English and Italian text."""
    return text.encode("cp1252").replace(b"\\", b"\\\\").replace(b"(", b"\\(").replace(b")", b"\\)")


def pdf(copy):
    """Keep a classic cross-reference table, matching the supported PDF scope."""
    stream = b"BT /F1 22 Tf 40 160 Td (" + pdf_literal(copy["heading"]) + b") Tj /F1 12 Tf"
    for index, line in enumerate(copy["lines"]):
        stream += f" 0 {-36 if index == 0 else -24} Td (".encode() + pdf_literal(line) + b") Tj"
    stream += b" ET\n"
    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 400 240] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"endstream"
    ]
    data = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for number, body in enumerate(objects, 1):
        offsets.append(len(data))
        data += f"{number} 0 obj\n".encode() + body + b"\nendobj\n"
    xref = len(data)
    data += b"xref\n0 6\n0000000000 65535 f \n"
    for offset in offsets[1:]:
        data += f"{offset:010} 00000 n \n".encode()
    data += f"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode()
    return data


manifest = {}
for language, copy in CONTENT.items():
    destination = ROOT / language
    destination.mkdir(parents=True, exist_ok=True)
    page = copy["html"]
    html = (f'<!doctype html><html lang="{language}"><head><meta charset="utf-8">'
            f'<title>{escape(page["title"])}</title></head><body><h1>{escape(page["heading"])}</h1>'
            f'<p>{escape(page["greeting"])}</p></body></html>\n')
    (destination / page["name"]).write_text(html, encoding="utf-8")
    (destination / copy["pdf"]["name"]).write_bytes(pdf(copy["pdf"]))
    for archive in copy["archives"]:
        with ZipFile(destination / archive["name"], "w") as output:
            for name, text in archive["entries"].items():
                entry = ZipInfo(name, (2026, 1, 1, 0, 0, 0))
                entry.compress_type = ZIP_DEFLATED
                entry.create_system = 3
                entry.external_attr = 0o100644 << 16
                output.writestr(entry, text.encode("utf-8"))
    # The image and instrumental tone have no language-specific content; share their bytes.
    manifest[language] = [
        {"path": "picture.png", "name": copy["image"]},
        {"path": f'{language}/{page["name"]}', "name": page["name"]},
        {"path": "tone.mp3", "name": copy["audio"]},
        {"path": f'{language}/{copy["pdf"]["name"]}', "name": copy["pdf"]["name"]},
        *({"path": f'{language}/{archive["name"]}', "name": archive["name"]} for archive in copy["archives"])
    ]

(ROOT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Created localized HTML/PDF/ZIP examples and manifest for " + ", ".join(CONTENT))
