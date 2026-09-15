"""Render the Enterprise Bench card series from data/agents.js.

    python3 growth/make_cards.py

Writes growth/cards/00-cover.png and one 1080x1350 PNG per agent, sized for
LinkedIn and Instagram portrait posts. Re-run after editing an agent.
"""
import json, re, subprocess, colorsys, pathlib
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "growth" / "cards"
W, H, PAD = 1080, 1350, 84

INK, INK2, MUTED, LINE, PAPER, BG, LIME = "#111418", "#3C424C", "#767C86", "#E5E2DC", "#FFFFFF", "#FAF9F7", "#DDF56A"
HN, MENLO = "/System/Library/Fonts/HelveticaNeue.ttc", "/System/Library/Fonts/Menlo.ttc"
def hn(size, face=0): return ImageFont.truetype(HN, size, index=face)
def mono(size, face=0): return ImageFont.truetype(MENLO, size, index=face)

def agents():
    js = "global.window={};require(%r);console.log(JSON.stringify(window.TOUPPER_AGENTS))" % str(ROOT / "data" / "agents.js")
    return json.loads(subprocess.check_output(["node", "-e", js]))

def hue(agent_id):                       # same formula as TU.hue in lib.js
    h = 0
    for ch in agent_id: h = (h * 31 + ord(ch)) % 360
    return h

def hsl(h, s, l):
    r, g, b = colorsys.hls_to_rgb(h / 360, l, s)
    return (round(r * 255), round(g * 255), round(b * 255))

def wrap(draw, text, font, width):
    words, lines, line = text.split(), [], ""
    for w in words:
        trial = (line + " " + w).strip()
        if draw.textlength(trial, font=font) <= width: line = trial
        else: lines.append(line); line = w
    if line: lines.append(line)
    return lines

def paragraph(draw, xy, text, font, fill, width, leading):
    x, y = xy
    for ln in wrap(draw, text, font, width):
        draw.text((x, y), ln, font=font, fill=fill); y += leading
    return y

def frame(n, total):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((36, 36, W - 36, H - 36), radius=36, fill=PAPER, outline=LINE, width=3)
    d.text((PAD, 96), "THE ENTERPRISE BENCH", font=mono(26, 1), fill=MUTED)
    if n is not None:
        label = "%02d / %02d" % (n, total)
        d.text((W - PAD - d.textlength(label, font=mono(26)), 96), label, font=mono(26), fill=MUTED)
    return img, d

def footer(d):
    d.line((PAD, H - 196, W - PAD, H - 196), fill=LINE, width=2)
    d.text((PAD, H - 166), "toupper.vercel.app/what", font=mono(30, 1), fill=INK)
    d.text((PAD, H - 118), "The names are puns. The specs are not.  Concept demo.", font=hn(26), fill=MUTED)

def agent_card(a, n, total):
    img, d = frame(n, total)
    color = hsl(hue(a["id"]), .30, .38)
    d.rounded_rectangle((PAD, 170, PAD + 150, 320), radius=26, fill=color)
    ini = a["initials"]
    f = mono(58, 1)
    d.text((PAD + 75 - d.textlength(ini, font=f) / 2, 212), ini, font=f, fill="#FFFFFF")

    y = 372
    name_font = hn(92, 1)
    for ln in wrap(d, a["name"], name_font, W - 2 * PAD):
        wlen = d.textlength(ln, font=name_font)
        d.rectangle((PAD, y + 66, PAD + wlen, y + 96), fill=LIME)
        d.text((PAD, y), ln, font=name_font, fill=INK); y += 104
    d.text((PAD, y + 14), a["title"].upper(), font=mono(30, 1), fill=MUTED)
    y += 92

    y = paragraph(d, (PAD, y), a["mandate"], hn(40, 0), INK2, W - 2 * PAD, 54) + 36
    d.rectangle((PAD, y, PAD + 8, y + 8), fill=None)
    qy = y
    q_font = hn(46, 3)
    y = paragraph(d, (PAD + 34, y), "“" + a["opinion"] + "”", q_font, INK, W - 2 * PAD - 34, 62)
    d.rectangle((PAD, qy + 6, PAD + 8, y - 12), fill=LIME)

    ask = "Ask %s about %s" % (a["short"], a["topic"]["label"]) if a.get("topic") else ""
    if ask and y < H - 290:
        f = hn(34, 10)
        d.text((PAD, H - 262), ask, font=f, fill="#1F3BEE")
        # Helvetica Neue has no arrow glyph; Menlo does.
        d.text((PAD + d.textlength(ask, font=f) + 14, H - 258), "→", font=mono(34, 1), fill="#1F3BEE")
    footer(d)
    return img

def cover(all_agents):
    img, d = frame(None, None)
    y, big = 190, hn(66, 1)
    for ln in wrap(d, "You just landed your first enterprise deal.", big, W - 2 * PAD):
        d.text((PAD, y), ln, font=big, fill=INK); y += 80
    for ln in wrap(d, "Then the questions started.", big, W - 2 * PAD):
        d.rectangle((PAD, y + 48, PAD + d.textlength(ln, font=big), y + 72), fill=LIME)
        d.text((PAD, y), ln, font=big, fill=INK); y += 80
    y += 50
    y = paragraph(d, (PAD, y), "Ten specialists, one part of the enterprise layer each. Named after what they do.",
                  hn(40), INK2, W - 2 * PAD, 54) + 40
    col_w = (W - 2 * PAD) // 2
    for i, a in enumerate(all_agents):
        cx, cy = PAD + (i % 2) * col_w, y + (i // 2) * 84
        d.rounded_rectangle((cx, cy, cx + 58, cy + 58), radius=12, fill=hsl(hue(a["id"]), .30, .38))
        f = mono(22, 1)
        d.text((cx + 29 - d.textlength(a["initials"], font=f) / 2, cy + 16), a["initials"], font=f, fill="#FFFFFF")
        d.text((cx + 76, cy + 4), a["name"], font=hn(30, 1), fill=INK)
        d.text((cx + 76, cy + 38), a["title"].upper(), font=mono(17), fill=MUTED)
    footer(d)
    return img

if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    A = agents()
    cover(A).save(OUT / "00-cover.png", optimize=True)
    for i, a in enumerate(A, 1):
        slug = re.sub(r"[^a-z0-9]+", "-", a["name"].lower()).strip("-")
        agent_card(a, i, len(A)).save(OUT / ("%02d-%s.png" % (i, slug)), optimize=True)
    print("wrote", len(A) + 1, "cards to", OUT)
