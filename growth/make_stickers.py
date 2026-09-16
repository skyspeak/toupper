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
from make_cards import agents, hue, hsl, hn, mono, wrap, glow, grain, INK, LIME, NIGHT, FOG, FOG2, BOLD, ITALIC

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
    return q.make_image(fill_color=NIGHT, back_color="white").convert("RGB").resize((size, size), Image.NEAREST)

def sticker(initials, color, name, line, url, hello="HELLO, MY NAME IS", sub="The name is a pun. The spec isn\u2019t."):
    r = 64
    img = Image.new("RGB", (S, S), NIGHT)
    glow(img, (S - 60, 40), 360, color, .9)
    glow(img, (0, S), 300, hsl(78, .85, .55), .18)
    grain(img, seed=len(name))
    d = ImageDraw.Draw(img)
    pad = 52

    d.rounded_rectangle((pad + 8, pad + 8, pad + 128, pad + 128), radius=26, fill=LIME)
    d.rounded_rectangle((pad, pad, pad + 120, pad + 120), radius=26, fill=color, outline=NIGHT, width=4)
    d.text((pad + 60, pad + 60), initials, font=mono(46, BOLD), fill="white", anchor="mm")

    d.text((pad + 152, pad + 4), hello, font=mono(22, BOLD), fill=LIME)
    y = pad + 38
    for ln in wrap(d, name, hn(46, BOLD), S - pad * 2 - 152)[:2]:
        d.text((pad + 152, y), ln, font=hn(46, BOLD), fill="white"); y += 52
    y = max(y, pad + 128) + 34

    f = hn(34, BOLD)
    tw = d.textlength(line, font=f)
    d.rounded_rectangle((pad, y, pad + tw + 48, y + 62), radius=31, fill=LIME)
    d.text((pad + 24, y + 31), line, font=f, fill=NIGHT, anchor="lm")

    sy = y + 96
    for ln in wrap(d, sub, hn(28, ITALIC), S - pad * 2)[:2]:
        d.text((pad, sy), ln, font=hn(28, ITALIC), fill=FOG2); sy += 36

    code, quiet = 220, 18
    qx, qy = S - pad - code - quiet, S - pad - code - quiet
    d.rounded_rectangle((qx - quiet, qy - quiet, qx + code + quiet, qy + code + quiet), radius=24, fill="white")
    img.paste(qr(url, code), (qx, qy))
    d.text((pad, S - pad - 96), "SCAN FOR WHAT", font=mono(24, BOLD), fill=FOG)
    d.text((pad, S - pad - 62), "IT REALLY TAKES", font=mono(24, BOLD), fill=FOG)
    d.text((pad + d.textlength("IT REALLY TAKES", font=mono(24, BOLD)) + 10, S - pad - 64), "→", font=mono(26, BOLD), fill=LIME)

    # Rounded corners, so the sheet shows the cut line.
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, S - 1, S - 1), radius=r, fill=255)
    out = Image.new("RGB", (S, S), "white")
    out.paste(img, (0, 0), mask)
    return out

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    items = []
    for a in agents():
        label = a["topic"]["label"]
        items.append((a["initials"], hsl(hue(a["id"]), .45, .45), a["name"],
                      "Ask me about " + label if len(label) < 16 else label[0].upper() + label[1:],
                      "https://toupper.vercel.app/what/%s?%s" % (a["topic"]["id"], TAG)))
    generic = hsl(250, .55, .5)
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
