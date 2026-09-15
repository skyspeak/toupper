"""Render a printable sticker sheet for conferences (growth hack 18).

    pip3 install qrcode        # once
    python3 growth/make_stickers.py

Writes growth/stickers/sheet-letter.png: US Letter at 300 dpi, twelve
2.5-inch square stickers (ten agents plus two general ones). Each QR code
opens that agent's topic with an h18 tag, so conference leads are counted.
Print on square sticker paper, or on card stock and cut.
"""
import sys, pathlib
from PIL import Image, ImageDraw
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from make_cards import agents, hue, hsl, hn, mono, wrap, INK, MUTED, LINE, LIME

try:
    import qrcode
except ImportError:
    sys.exit("Needs the qrcode package: pip3 install qrcode")

OUT = pathlib.Path(__file__).resolve().parent / "stickers"
DPI = 300
PAGE_W, PAGE_H = int(8.5 * DPI), 11 * DPI
S = int(2.5 * DPI)                                   # sticker edge
COLS, ROWS = 3, 4
GX = (PAGE_W - COLS * S) // (COLS + 1)
GY = (PAGE_H - ROWS * S) // (ROWS + 1)
TAG = "utm_source=conference&utm_medium=sticker&utm_campaign=h18_stickers"

def qr(url, size):
    q = qrcode.QRCode(border=0, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url); q.make(fit=True)
    return q.make_image(fill_color=INK, back_color="white").convert("RGB").resize((size, size), Image.NEAREST)

def sticker(initials, color, name, line, url, hello="HELLO, MY NAME IS", sub="The name is a pun. The spec isn\u2019t."):
    img = Image.new("RGB", (S, S), "white")
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((4, 4, S - 5, S - 5), radius=48, outline=LINE, width=4)
    pad = 48
    d.rounded_rectangle((pad, pad, pad + 120, pad + 120), radius=22, fill=color)
    f = mono(46, 1)
    d.text((pad + 60 - d.textlength(initials, font=f) / 2, pad + 34), initials, font=f, fill="white")
    d.text((pad + 144, pad + 6), hello, font=mono(22, 1), fill=MUTED)
    y = pad + 40
    for ln in wrap(d, name, hn(44, 1), S - pad * 2 - 144)[:2]:
        d.text((pad + 144, y), ln, font=hn(44, 1), fill=INK); y += 50
    y = max(y, pad + 120) + 28
    d.rectangle((pad, y + 36, pad + d.textlength(line, font=hn(38, 1)), y + 52), fill=LIME)
    d.text((pad, y), line, font=hn(38, 1), fill=INK)
    paragraph_y = y + 90
    for ln in wrap(d, sub, hn(30), S - pad * 2)[:2]:
        d.text((pad, paragraph_y), ln, font=hn(30), fill=MUTED); paragraph_y += 38
    code = 250
    img.paste(qr(url, code), (S - pad - code, S - pad - code))
    d.text((pad, S - pad - 92), "Scan for what", font=hn(30), fill=MUTED)
    d.text((pad, S - pad - 56), "it really takes", font=hn(30), fill=MUTED)
    return img

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    items = []
    for a in agents():
        label = a["topic"]["label"]
        items.append((a["initials"], hsl(hue(a["id"]), .30, .38), a["name"],
                      "Ask me about " + label if len(label) < 16 else label[0].upper() + label[1:],
                      "https://toupper.vercel.app/what/%s?%s" % (a["topic"]["id"], TAG)))
    generic = hsl(0, 0, .07)
    items.append(("TU", generic, "Your first enterprise deal", "Now what?", "https://toupper.vercel.app/?" + TAG,
                  "JUST SIGNED?", "Ten specialists, one enterprise ask each."))
    items.append(("?", generic, "What does SCIM even mean?", "28 answers", "https://toupper.vercel.app/what?" + TAG,
                  "ASK OUR AGENTS", "SSO, SOC 2, RAG, evals and more, with rough estimates."))

    page = Image.new("RGB", (PAGE_W, PAGE_H), "white")
    for i, it in enumerate(items[:COLS * ROWS]):
        x = GX + (i % COLS) * (S + GX)
        y = GY + (i // COLS) * (S + GY)
        page.paste(sticker(*it), (x, y))
    page.save(OUT / "sheet-letter.png", dpi=(DPI, DPI), optimize=True)
    print("wrote", OUT / "sheet-letter.png")
