"""Render the Enterprise Bench card series from data/agents.js.

    python3 growth/make_cards.py

Writes growth/cards/00-cover.png and one 1080x1350 PNG per agent, sized for
LinkedIn and Instagram portrait posts. Re-run after editing an agent.
"""
import json, re, random, subprocess, colorsys, pathlib
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "growth" / "cards"
W, H, PAD = 1080, 1350, 84

# Light palette (stickers and print) and the dark card palette.
INK, INK2, MUTED, LINE, PAPER, BG, LIME = "#111418", "#3C424C", "#767C86", "#E5E2DC", "#FFFFFF", "#FAF9F7", "#DDF56A"
NIGHT, NIGHT2, FOG, FOG2, EDGE = "#0B0D12", "#151922", "#E9ECF2", "#9AA1AE", "#262B36"
HN, MENLO = "/System/Library/Fonts/HelveticaNeue.ttc", "/System/Library/Fonts/Menlo.ttc"
def hn(size, face=0): return ImageFont.truetype(HN, size, index=face)
def mono(size, face=0): return ImageFont.truetype(MENLO, size, index=face)
BOLD, ITALIC, BOLD_ITALIC, CONDENSED_BLACK, LIGHT, MEDIUM = 1, 2, 3, 9, 7, 10

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

# ---------------------------------------------------------------- dark canvas

def glow(img, centre, radius, color, strength):
    """Soft coloured light, blended over the canvas."""
    layer = Image.new("RGB", img.size, (0, 0, 0))
    ImageDraw.Draw(layer).ellipse((centre[0] - radius, centre[1] - radius, centre[0] + radius, centre[1] + radius), fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(radius * .55))
    mask = layer.convert("L").point(lambda v: int(v * strength))
    img.paste(layer, (0, 0), mask)

def grain(img, amount=7, seed=1):
    rnd = random.Random(seed)
    noise = Image.frombytes("L", img.size, bytes(rnd.randrange(256) for _ in range(img.size[0] * img.size[1])))
    img.paste(Image.new("RGB", img.size, "#FFFFFF"), (0, 0), noise.point(lambda v: amount if v > 128 else 0))

def dot_grid(d, top, bottom, step=36, fill="#1B2029"):
    for y in range(top, bottom, step):
        for x in range(PAD // 2, W - PAD // 2 + 1, step):
            d.ellipse((x - 2, y - 2, x + 2, y + 2), fill=fill)

def canvas(seed, accent):
    img = Image.new("RGB", (W, H), NIGHT)
    dot_grid(ImageDraw.Draw(img), 40, H - 40)
    glow(img, (W - 120, 150), 520, accent, .85)
    glow(img, (80, H - 60), 420, hsl(78, .85, .55), .22)      # a little lime from below
    grain(img, seed=seed)
    return img, ImageDraw.Draw(img)

def pill(d, xy, text, font, fg, bg, pad_x=22, pad_y=12, outline=None):
    x, y = xy
    w = d.textlength(text, font=font)
    box = font.getbbox(text)
    h = box[3] - box[1]
    d.rounded_rectangle((x, y, x + w + pad_x * 2, y + h + pad_y * 2), radius=(h + pad_y * 2) // 2, fill=bg, outline=outline, width=2)
    d.text((x + pad_x, y + pad_y - box[1]), text, font=font, fill=fg)
    return x + w + pad_x * 2

def header(d, n, total):
    f = mono(24, BOLD)
    d.ellipse((PAD, 104, PAD + 14, 118), fill=LIME)
    d.text((PAD + 28, 98), "THE ENTERPRISE BENCH", font=f, fill=FOG)
    if n is not None:
        label = "%02d / %02d" % (n, total)
        pill(d, (W - PAD - d.textlength(label, font=mono(24)) - 36, 86), label, mono(24), FOG, None, pad_x=18, pad_y=10, outline=EDGE)

def footer(d):
    y = H - 150
    d.line((PAD, y, W - PAD, y), fill=EDGE, width=2)
    d.text((PAD, y + 34), "toupper.vercel.app/what", font=mono(28, BOLD), fill=FOG)
    note = "Puns: fictional. Specs: real."
    d.text((W - PAD - d.textlength(note, font=hn(26, ITALIC)), y + 36), note, font=hn(26, ITALIC), fill=FOG2)

def arrow(d, x, y, size, fill):
    # Helvetica Neue has no arrow glyph; Menlo does.
    d.text((x, y), "→", font=mono(size, BOLD), fill=fill)

# ---------------------------------------------------------------- cards

def agent_card(a, n, total):
    color = hsl(hue(a["id"]), .55, .52)
    img, d = canvas(n, color)
    header(d, n, total)

    # Giant ghost initials behind the name.
    ghost = Image.new("L", (W, H), 0)
    ImageDraw.Draw(ghost).text((W - 40, 150), a["initials"], font=hn(520, CONDENSED_BLACK), fill=20, anchor="ra")
    img.paste(Image.new("RGB", (W, H), "#FFFFFF"), (0, 0), ghost)

    # Avatar tile with a lime offset shadow.
    top = 190
    d.rounded_rectangle((PAD + 12, top + 12, PAD + 172, top + 172), radius=34, fill=LIME)
    d.rounded_rectangle((PAD, top, PAD + 160, top + 160), radius=34, fill=hsl(hue(a["id"]), .45, .40), outline=NIGHT, width=4)
    f = mono(64, BOLD)
    d.text((PAD + 80, top + 80), a["initials"], font=f, fill="#FFFFFF", anchor="mm")

    y = top + 222
    name_font = hn(98, BOLD)
    for ln in wrap(d, a["name"], name_font, W - 2 * PAD):
        d.text((PAD, y), ln, font=name_font, fill="#FFFFFF"); y += 104
    y += 18
    pill(d, (PAD, y), a["title"].upper(), mono(24, BOLD), NIGHT, LIME)
    y += 92

    y = paragraph(d, (PAD, y), a["mandate"], hn(36, LIGHT), FOG, W - 2 * PAD, 50) + 40

    # Opinion in a glass panel.
    q_font = hn(42, BOLD_ITALIC)
    lines = wrap(d, a["opinion"], q_font, W - 2 * PAD - 150)
    box_h = len(lines) * 56 + 64
    panel = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(panel).rounded_rectangle((PAD, y, W - PAD, y + box_h), radius=28, fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=2)
    img.paste(panel, (0, 0), panel)
    d.text((PAD + 22, y + 4), "“", font=hn(120, BOLD), fill=LIME)
    qy = y + 32
    for ln in lines:
        d.text((PAD + 112, qy), ln, font=q_font, fill="#FFFFFF"); qy += 56
    y += box_h

    ask = "Ask %s about %s" % (a["short"], a["topic"]["label"]) if a.get("topic") else ""
    if ask and y < H - 270:
        f = hn(32, BOLD)
        bx = PAD
        by = H - 250
        tw = d.textlength(ask, font=f)
        w = 30 + tw + 18 + 40 + 28
        d.rounded_rectangle((bx, by, bx + w, by + 72), radius=36, fill=LIME)
        d.text((bx + 30, by + 36), ask, font=f, fill=NIGHT, anchor="lm")
        arrow(d, bx + 30 + tw + 18, by + 14, 34, NIGHT)
    footer(d)
    return img

def cover(all_agents):
    img, d = canvas(0, hsl(250, .7, .55))
    header(d, None, None)
    y, big = 180, hn(86, BOLD)
    for ln in wrap(d, "You just landed your first enterprise deal.", big, W - 2 * PAD):
        d.text((PAD, y), ln, font=big, fill="#FFFFFF"); y += 94
    y += 8
    for ln in wrap(d, "Then the questions started.", big, W - 2 * PAD):
        wlen = d.textlength(ln, font=big)
        d.rounded_rectangle((PAD - 10, y + 6, PAD + wlen + 14, y + 100), radius=14, fill=LIME)
        d.text((PAD, y), ln, font=big, fill=NIGHT); y += 104
    y += 34
    y = paragraph(d, (PAD, y), "Ten specialists. One part of the enterprise layer each. Named after what they do.",
                  hn(36, LIGHT), FOG, W - 2 * PAD, 50) + 36

    col_w = (W - 2 * PAD - 20) // 2
    row_h = 82
    for i, a in enumerate(all_agents):
        cx, cy = PAD + (i % 2) * (col_w + 20), y + (i // 2) * (row_h + 12)
        d.rounded_rectangle((cx, cy, cx + col_w, cy + row_h), radius=20, fill=NIGHT2, outline=EDGE, width=2)
        d.rounded_rectangle((cx + 12, cy + 12, cx + 70, cy + 70), radius=14, fill=hsl(hue(a["id"]), .45, .45))
        d.text((cx + 41, cy + 41), a["initials"], font=mono(22, BOLD), fill="#FFFFFF", anchor="mm")
        name_f = hn(28, BOLD)
        name = a["name"]
        while d.textlength(name, font=name_f) > col_w - 100 and name_f.size > 20:
            name_f = hn(name_f.size - 1, BOLD)
        d.text((cx + 86, cy + 14), name, font=name_f, fill="#FFFFFF")
        d.text((cx + 86, cy + 50), a["title"].upper()[:28], font=mono(15), fill=FOG2)
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
