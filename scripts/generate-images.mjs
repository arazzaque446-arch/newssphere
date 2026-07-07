import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

/** Minimal valid JPEG (800x600 gray) — no external deps, always loads */
function createJpeg(width, height, r, g, b) {
  const SOI = Buffer.from([0xff, 0xd8]);
  const EOI = Buffer.from([0xff, 0xd9]);

  // APP0 JFIF marker
  const app0 = Buffer.from([
    0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00,
    0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
  ]);

  // Quantization table (luminance)
  const dqt = Buffer.from([
    0xff, 0xdb, 0x00, 0x43, 0x00,
    16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55,
    14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62,
    18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92,
    49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99,
  ]);

  const sos = Buffer.from([
    0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00,
  ]);

  // SOF0 baseline DCT
  const sof = Buffer.alloc(19);
  sof[0] = 0xff;
  sof[1] = 0xc0;
  sof[2] = 0x00;
  sof[3] = 0x11;
  sof[4] = 0x08;
  sof.writeUInt16BE(height, 5);
  sof.writeUInt16BE(width, 7);
  sof[9] = 0x03; // 3 components
  sof[10] = 0x01;
  sof[11] = 0x11;
  sof[12] = 0x00;
  sof[13] = 0x02;
  sof[14] = 0x11;
  sof[15] = 0x01;
  sof[16] = 0x03;
  sof[17] = 0x11;
  sof[18] = 0x01;

  // Single MCU flat color scan data (simplified baseline JPEG)
  const y = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  const cb = Math.round(128 - 0.168736 * r - 0.331264 * g + 0.5 * b);
  const cr = Math.round(128 + 0.5 * r - 0.418688 * g - 0.081312 * b);

  const scan = Buffer.from([y, cb, cr]);
  const dht = Buffer.from([
    0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01, 0x01, 0x01,
    0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02,
    0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0xff, 0xc4, 0x00, 0xb5, 0x10, 0x00, 0x02, 0x01, 0x03, 0x03, 0x02, 0x04,
    0x03, 0x05, 0x05, 0x04, 0x04, 0x00, 0x00, 0x01, 0x7d, 0x01, 0x02, 0x03,
    0x00, 0x04, 0x11, 0x05, 0x12, 0x21, 0x31, 0x41, 0x06, 0x13, 0x51, 0x61,
    0x07, 0x22, 0x71, 0x14, 0x32, 0x81, 0x91, 0xa1, 0x08, 0x23, 0x42, 0xb1,
    0xc1, 0x15, 0x52, 0xd1, 0xf0, 0x24, 0x33, 0x62, 0x72, 0x82, 0x09, 0x0a,
    0x16, 0x17, 0x18, 0x19, 0x1a, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x34,
    0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48,
    0x49, 0x4a, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x63, 0x64,
    0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78,
    0x79, 0x7a, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8a, 0x92, 0x93,
    0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6,
    0xa7, 0xa8, 0xa9, 0xaa, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6, 0xb7, 0xb8, 0xb9,
    0xba, 0xc2, 0xc3, 0xc4, 0xc5, 0xc6, 0xc7, 0xc8, 0xc9, 0xca, 0xd2, 0xd3,
    0xd4, 0xd5, 0xd6, 0xd7, 0xd8, 0xd9, 0xda, 0xe1, 0xe2, 0xe3, 0xe4, 0xe5,
    0xe6, 0xe7, 0xe8, 0xe9, 0xea, 0xf1, 0xf2, 0xf3, 0xf4, 0xf5, 0xf6, 0xf7,
    0xf8, 0xf9, 0xfa,
  ]);

  return Buffer.concat([SOI, app0, dqt, dqt, sof, dht, sos, scan, EOI]);
}

function createPhotoSvg(title, subtitle, colors, width, height) {
  const [c1, c2, c3] = colors;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="50%" style="stop-color:${c2}"/>
      <stop offset="100%" style="stop-color:${c3}"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="20%" r="70%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.18)"/>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <circle cx="${width * 0.75}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.25}" fill="${c3}" opacity="0.35" filter="url(#blur)"/>
  <circle cx="${width * 0.2}" cy="${height * 0.75}" r="${Math.min(width, height) * 0.2}" fill="${c1}" opacity="0.25" filter="url(#blur)"/>
  <rect x="0" y="${height * 0.55}" width="100%" height="${height * 0.45}" fill="rgba(0,0,0,0.35)"/>
  <text x="${width * 0.06}" y="${height * 0.82}" fill="white" font-family="Georgia, serif" font-size="${Math.round(height * 0.055)}" font-weight="700">${title}</text>
  <text x="${width * 0.06}" y="${height * 0.9}" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" font-size="${Math.round(height * 0.028)}" letter-spacing="2">${subtitle}</text>
</svg>`;
}

const images = [
  { file: "solar-energy.jpg", w: 1200, h: 800, rgb: [234, 179, 60] },
  { file: "supreme-court.jpg", w: 800, h: 600, rgb: [100, 116, 139] },
  { file: "metro-train.jpg", w: 800, h: 600, rgb: [59, 130, 246] },
  { file: "computer-chip.jpg", w: 800, h: 600, rgb: [16, 185, 129] },
  { file: "climate-summit.jpg", w: 800, h: 600, rgb: [34, 197, 94] },
  { file: "stock-market.jpg", w: 800, h: 600, rgb: [30, 64, 175] },
  { file: "hockey.jpg", w: 800, h: 600, rgb: [220, 38, 38] },
  { file: "medical-lab.jpg", w: 800, h: 600, rgb: [14, 165, 233] },
  { file: "cinema.jpg", w: 800, h: 600, rgb: [127, 29, 29] },
  { file: "literature-festival.jpg", w: 800, h: 600, rgb: [180, 83, 9] },
  { file: "coastal-highway.jpg", w: 800, h: 600, rgb: [71, 85, 105] },
  { file: "rocket-launch.jpg", w: 800, h: 600, rgb: [15, 23, 42] },
  { file: "cat-politics.jpg", w: 600, h: 400, rgb: [87, 83, 78] },
  { file: "cat-business.jpg", w: 600, h: 400, rgb: [37, 99, 235] },
  { file: "cat-technology.jpg", w: 600, h: 400, rgb: [6, 182, 212] },
  { file: "cat-sports.jpg", w: 600, h: 400, rgb: [239, 68, 68] },
  { file: "cat-health.jpg", w: 600, h: 400, rgb: [52, 211, 153] },
  { file: "cat-entertainment.jpg", w: 600, h: 400, rgb: [168, 85, 247] },
];

const svgPhotos = [
  { file: "solar-energy.svg", title: "Green Energy", subtitle: "NEWS SPHERE", colors: ["#f59e0b", "#d97706", "#92400e"], w: 1200, h: 800 },
  { file: "supreme-court.svg", title: "Politics", subtitle: "NEWS SPHERE", colors: ["#475569", "#334155", "#1e293b"], w: 800, h: 600 },
  { file: "metro-train.svg", title: "Local News", subtitle: "NEWS SPHERE", colors: ["#3b82f6", "#2563eb", "#1e3a8a"], w: 800, h: 600 },
  { file: "computer-chip.svg", title: "Technology", subtitle: "NEWS SPHERE", colors: ["#10b981", "#059669", "#064e3b"], w: 800, h: 600 },
  { file: "climate-summit.svg", title: "World News", subtitle: "NEWS SPHERE", colors: ["#22c55e", "#16a34a", "#14532d"], w: 800, h: 600 },
  { file: "stock-market.svg", title: "Business", subtitle: "NEWS SPHERE", colors: ["#1d4ed8", "#1e40af", "#172554"], w: 800, h: 600 },
  { file: "hockey.svg", title: "Sports", subtitle: "NEWS SPHERE", colors: ["#ef4444", "#dc2626", "#7f1d1d"], w: 800, h: 600 },
  { file: "medical-lab.svg", title: "Health", subtitle: "NEWS SPHERE", colors: ["#0ea5e9", "#0284c7", "#0c4a6e"], w: 800, h: 600 },
  { file: "cinema.svg", title: "Entertainment", subtitle: "NEWS SPHERE", colors: ["#991b1b", "#7f1d1d", "#450a0a"], w: 800, h: 600 },
  { file: "literature-festival.svg", title: "Events", subtitle: "NEWS SPHERE", colors: ["#d97706", "#b45309", "#78350f"], w: 800, h: 600 },
  { file: "coastal-highway.svg", title: "Infrastructure", subtitle: "NEWS SPHERE", colors: ["#64748b", "#475569", "#1e293b"], w: 800, h: 600 },
  { file: "rocket-launch.svg", title: "Space", subtitle: "NEWS SPHERE", colors: ["#1e293b", "#0f172a", "#020617"], w: 800, h: 600 },
  { file: "cat-politics.svg", title: "Politics", subtitle: "EXPLORE", colors: ["#57534e", "#44403c", "#292524"], w: 600, h: 400 },
  { file: "cat-business.svg", title: "Business", subtitle: "EXPLORE", colors: ["#2563eb", "#1d4ed8", "#1e3a8a"], w: 600, h: 400 },
  { file: "cat-technology.svg", title: "Technology", subtitle: "EXPLORE", colors: ["#06b6d4", "#0891b2", "#164e63"], w: 600, h: 400 },
  { file: "cat-sports.svg", title: "Sports", subtitle: "EXPLORE", colors: ["#f87171", "#ef4444", "#991b1b"], w: 600, h: 400 },
  { file: "cat-health.svg", title: "Health", subtitle: "EXPLORE", colors: ["#34d399", "#10b981", "#065f46"], w: 600, h: 400 },
  { file: "cat-entertainment.svg", title: "Entertainment", subtitle: "EXPLORE", colors: ["#a855f7", "#9333ea", "#581c87"], w: 600, h: 400 },
];

// Use SVG — reliable, rich visuals, works with Next.js Image from /public
for (const img of svgPhotos) {
  const content = createPhotoSvg(img.title, img.subtitle, img.colors, img.w, img.h);
  const outPath = join(outDir, img.file);
  writeFileSync(outPath, content, "utf8");
  console.log(`Created ${img.file}`);
}

console.log(`\nDone — ${svgPhotos.length} images in public/images/`);
