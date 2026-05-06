#!/usr/bin/env python3
"""
Generate app icon + splash screen for Lauren's Fitness.
Warm palette: cream background, blush + sage marks. No emoji, no text.

Outputs (to assets/):
  icon.png            1024x1024
  adaptive-icon.png   1024x1024  (Android foreground; transparent bg, mark only)
  splash-icon.png     1242x2436  (centered mark on cream)
  favicon.png           48x48
"""

from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
import math

ASSETS = Path(__file__).resolve().parent.parent / "assets"

# Palette (matches src/theme/colors.ts)
CREAM = (255, 248, 240)
WARM_WHITE = (255, 253, 251)
BLUSH = (232, 160, 191)
BLUSH_LIGHT = (245, 213, 229)
SAGE = (168, 197, 160)
SAGE_LIGHT = (212, 231, 207)
TERRACOTTA = (212, 133, 107)
CHARCOAL = (61, 53, 49)


def radial_gradient(size, inner, outer, center=None, radius=None):
    """Soft radial gradient from inner color at center to outer at edge."""
    w, h = size
    if center is None:
        center = (w / 2, h * 0.42)
    if radius is None:
        radius = max(w, h) * 0.75

    img = Image.new("RGB", size, outer)
    px = img.load()
    cx, cy = center
    for y in range(h):
        for x in range(w):
            d = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            t = min(1.0, d / radius)
            # ease-out
            t = 1 - (1 - t) ** 2
            r = int(inner[0] + (outer[0] - inner[0]) * t)
            g = int(inner[1] + (outer[1] - inner[1]) * t)
            b = int(inner[2] + (outer[2] - inner[2]) * t)
            px[x, y] = (r, g, b)
    return img


def heart_path(cx, cy, size):
    """Return a list of (x, y) points tracing a heart shape."""
    pts = []
    steps = 240
    for i in range(steps):
        t = (i / steps) * 2 * math.pi
        # classic parametric heart
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((cx + x * size / 32, cy - y * size / 32))
    return pts


def leaf_path(cx, cy, length, width, angle_deg=0):
    """Return a list of (x, y) points tracing a clean almond/leaf shape.

    The leaf points 'up' before rotation: tip at (cx, cy - length/2),
    base at (cx, cy + length/2). length is the long axis, width is the short.
    """
    pts = []
    steps = 80
    a = math.radians(angle_deg)
    cos_a, sin_a = math.cos(a), math.sin(a)
    for i in range(steps + 1):
        t = (i / steps) * 2 * math.pi
        # Vesica/almond using sin for width, cos for length
        x = math.sin(t) * (width / 2)
        y = -math.cos(t) * (length / 2)
        rx = x * cos_a - y * sin_a
        ry = x * sin_a + y * cos_a
        pts.append((cx + rx, cy + ry))
    return pts


def stem_path(cx, cy, height, width, angle_deg=0):
    """Tiny tapered stem connecting leaf base to heart top."""
    pts = []
    a = math.radians(angle_deg)
    cos_a, sin_a = math.cos(a), math.sin(a)
    steps = 14
    for i in range(steps + 1):
        t = i / steps
        x = (width / 2) * (1 - t)
        y = -t * height
        rx = x * cos_a - y * sin_a
        ry = x * sin_a + y * cos_a
        pts.append((cx + rx, cy + ry))
    for i in range(steps + 1):
        t = 1 - i / steps
        x = -(width / 2) * (1 - t)
        y = -t * height
        rx = x * cos_a - y * sin_a
        ry = x * sin_a + y * cos_a
        pts.append((cx + rx, cy + ry))
    return pts


def draw_mark(draw, cx, cy, size, heart_color=BLUSH, leaf_color=SAGE):
    """Heart with two leaves sprouting from the top dimple — clean, iconic, warm.

    `size` is roughly the diameter of the heart. Leaves are drawn first so
    the heart covers their bases — they appear to grow from the top dimple.
    """
    # Anchor leaf BASES inside the heart so the heart hides the bases cleanly.
    # The parametric heart's visible top dimple sits around cy - 0.18*size in
    # render space; anchoring 0.05*size above means leaf tips emerge cleanly.
    base_y = cy - size * 0.05

    leaf_len = size * 0.78
    leaf_w = size * 0.26
    angle = 26  # outward splay from vertical

    def leaf_center(direction_deg):
        rad = math.radians(direction_deg)
        # leaf_path centers the leaf on its anchor; offset by half-length along
        # the rotated 'up' axis so the base lands at base_y.
        cx_off = math.sin(rad) * (leaf_len / 2)
        cy_off = math.cos(rad) * (leaf_len / 2)
        return (cx + cx_off, base_y - cy_off)

    lx, ly = leaf_center(-angle)
    rx, ry = leaf_center(angle)
    draw.polygon(leaf_path(lx, ly, leaf_len, leaf_w, angle_deg=-angle), fill=leaf_color)
    draw.polygon(leaf_path(rx, ry, leaf_len, leaf_w, angle_deg=angle), fill=leaf_color)

    # Heart on top — covers the leaf bases cleanly.
    pts = heart_path(cx, cy, size)
    draw.polygon(pts, fill=heart_color)


def generate_icon(out_path, size=1024):
    bg = radial_gradient((size, size), WARM_WHITE, CREAM)
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    # Mark fills ~58% of canvas (heart diameter); total height with leaves ~85%.
    mark_size = size * 0.58
    # Shift down a touch so leaves don't crowd the top edge.
    cx, cy = size / 2, size / 2 + size * 0.10

    # Soft drop shadow under the heart
    shadow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.polygon(
        heart_path(cx, cy + mark_size * 0.08, mark_size * 1.0),
        fill=(61, 53, 49, 32),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=size * 0.025))

    draw_mark(draw, cx, cy, mark_size)

    final = bg.convert("RGBA")
    final.alpha_composite(shadow)
    final.alpha_composite(layer)
    final.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  wrote {out_path}")


def generate_adaptive_icon(out_path, size=1024):
    """Android adaptive icon foreground — mark only on transparent.

    Adaptive icons are masked into a 66% safe zone, so size the heart smaller.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw_mark(draw, size / 2, size / 2 + size * 0.07, size * 0.40)
    img.save(out_path, "PNG", optimize=True)
    print(f"  wrote {out_path}")


def generate_splash_icon(out_path, size=1024):
    """Modern Expo splash uses splash-icon.png as the centered mark; bg comes from app.json."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw_mark(draw, size / 2, size / 2 + size * 0.07, size * 0.50)
    img.save(out_path, "PNG", optimize=True)
    print(f"  wrote {out_path}")


def generate_favicon(out_path, size=48):
    img = Image.new("RGBA", (size, size), CREAM)
    draw = ImageDraw.Draw(img)
    pts = heart_path(size / 2, size / 2, size * 0.95)
    draw.polygon(pts, fill=BLUSH)
    img.convert("RGB").save(out_path, "PNG", optimize=True)
    print(f"  wrote {out_path}")


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    print("Generating icons in", ASSETS)
    generate_icon(ASSETS / "icon.png")
    generate_adaptive_icon(ASSETS / "adaptive-icon.png")
    generate_splash_icon(ASSETS / "splash-icon.png")
    generate_favicon(ASSETS / "favicon.png")
    print("Done.")


if __name__ == "__main__":
    main()
