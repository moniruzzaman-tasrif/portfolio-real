/**
 * Generates a stylish portrait placeholder for the hero section:
 * Forest-green gradient backdrop, copper radial glow, soft-edged
 * head-and-shoulders silhouette, film grain, and a copper rim light.
 *
 * Usage: node scripts/generate-hero-placeholder.mjs
 * Output: src/assets/hero-photo.png (900x900)
 *
 * Replace src/assets/hero-photo.png with your real photo at any time —
 * no code changes required.
 */

import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 900;
const H = 900;

// ---------------------------------------------------------------- math
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

// deterministic hash noise for film grain
const hash = (x, y) => {
  let h = (x * 374761393 + y * 668265263) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295; // 0..1
};

// palette (0..1)
const BG_TOP = [0x1d / 255, 0x30 / 255, 0x28 / 255];
const BG_BOTTOM = [0x0b / 255, 0x12 / 255, 0x0f / 255];
const COPPER = [0xc4 / 255, 0x7b / 255, 0x55 / 255];
const SIL_TOP = [0x35 / 255, 0x51 / 255, 0x43 / 255];
const SIL_BOTTOM = [0x24 / 255, 0x38 / 255, 0x2f / 255];

// silhouette geometry (normalized units)
const HEAD = { cx: 0.5, cy: 0.375, r: 0.148 };
const BODY = { cx: 0.5, cy: 1.04, rx: 0.315, ry: 0.33 };

/** Signed-ish silhouette coverage at normalized (u,v), 0..1. */
function silhouette(u, v, pxOffset = 0) {
  const uu = u + pxOffset / W;
  const dh = Math.hypot(uu - HEAD.cx, v - HEAD.cy) - HEAD.r;
  const db =
    Math.hypot((uu - BODY.cx) / BODY.rx, (v - BODY.cy) / BODY.ry) - 1;
  const d = Math.min(dh, db * Math.min(BODY.rx, BODY.ry));
  return smoothstep(0.004, -0.004, d);
}

// ---------------------------------------------------------------- pixels
const raw = Buffer.alloc((W * 4 + 1) * H); // +1 byte per scanline (filter 0)

for (let y = 0; y < H; y++) {
  const v = y / H;
  const row = y * (W * 4 + 1);
  raw[row] = 0; // no filter

  for (let x = 0; x < W; x++) {
    const u = x / W;
    let [r, g, b] = [
      mix(BG_TOP[0], BG_BOTTOM[0], v),
      mix(BG_TOP[1], BG_BOTTOM[1], v),
      mix(BG_TOP[2], BG_BOTTOM[2], v),
    ];

    // copper radial glow, upper right
    const gd = Math.hypot(u - 0.7, v - 0.24);
    const glow = Math.exp(-((gd / 0.42) ** 2)) * 0.5;
    r += COPPER[0] * glow;
    g += COPPER[1] * glow;
    b += COPPER[2] * glow;

    // silhouette with vertical shading
    const mask = silhouette(u, v);
    if (mask > 0) {
      const shade = smoothstep(0.15, 0.85, v);
      const sr = mix(SIL_TOP[0], SIL_BOTTOM[0], shade);
      const sg = mix(SIL_TOP[1], SIL_BOTTOM[1], shade);
      const sb = mix(SIL_TOP[2], SIL_BOTTOM[2], shade);
      r = mix(r, sr, mask);
      g = mix(g, sg, mask);
      b = mix(b, sb, mask);

      // copper rim light on the right edge
      const rim = clamp(silhouette(u, v, -4) - mask, 0, 1);
      r += COPPER[0] * rim * 0.85;
      g += COPPER[1] * rim * 0.85;
      b += COPPER[2] * rim * 0.85;
    }

    // soft vignette
    const vd = Math.hypot(u - 0.5, v - 0.5);
    const vig = 1 - smoothstep(0.45, 0.95, vd) * 0.35;
    r *= vig;
    g *= vig;
    b *= vig;

    // film grain
    const n = (hash(x, y) - 0.5) * 0.022;
    r += n;
    g += n;
    b += n;

    const i = row + 1 + x * 4;
    raw[i] = Math.round(clamp(r, 0, 1) * 255);
    raw[i + 1] = Math.round(clamp(g, 0, 1) * 255);
    raw[i + 2] = Math.round(clamp(b, 0, 1) * 255);
    raw[i + 3] = 255;
  }
}

// ---------------------------------------------------------------- png
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "src", "assets");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "hero-photo.png");
writeFileSync(outFile, png);
console.log(`Wrote ${outFile} (${W}x${H}, ${Math.round(png.length / 1024)} KB)`);
