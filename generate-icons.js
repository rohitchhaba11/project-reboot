import fs from 'fs';
import zlib from 'zlib';

function createPNG(size) {
  const width = size;
  const height = size;

  // Raw uncompressed RGBA pixel data with filter byte (0) before each scanline
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter byte 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Squircle background
      const nx = Math.abs(dx) / (width * 0.44);
      const ny = Math.abs(dy) / (height * 0.44);
      const squircle = Math.pow(nx, 4) + Math.pow(ny, 4);

      if (squircle <= 1.0) {
        // Gradient from Midnight Blue (8, 13, 31) to Deep Cyber (4, 7, 17)
        let r = 8 + (x / width) * 10;
        let g = 13 + (y / height) * 15;
        let b = 31 + (x / width) * 40;
        let a = 255;

        // Border glow
        if (squircle > 0.88 && squircle <= 1.0) {
          r = 0;
          g = 240;
          b = 255;
        }

        // Electric Bolt in center
        // Bolt shape coordinates normalized [-1, 1]
        const bx = dx / (width * 0.28);
        const by = dy / (height * 0.28);

        // Simple bolt logic:
        const inTopPart = (by >= -0.7 && by <= 0.05 && bx >= (-0.2 - by * 0.4) && bx <= (0.35 - by * 0.2));
        const inBotPart = (by >= -0.05 && by <= 0.75 && bx >= (-0.35 - by * 0.2) && bx <= (0.2 - by * 0.4));
        const inCenterCore = (Math.abs(bx) < 0.15 && Math.abs(by) < 0.2);

        if (inTopPart || inBotPart || inCenterCore) {
          // Neon Cyan to Electric Violet gradient
          r = 0 + (y / height) * 139;
          g = 240 - (y / height) * 148;
          b = 255;
        }

        rawData[pxOffset] = Math.min(255, Math.floor(r));
        rawData[pxOffset + 1] = Math.min(255, Math.floor(g));
        rawData[pxOffset + 2] = Math.min(255, Math.floor(b));
        rawData[pxOffset + 3] = a;
      } else {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
      }
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawData);

  // Helper CRC32
  function crc32(buf) {
    let crc = 0 ^ -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const mask = -(crc & 1);
        crc = (crc >>> 1) ^ (0xedb88320 & mask);
        if ((byte & 1) !== 0) {
          crc = (crc >>> 1) ^ 0xedb88320;
        } else {
          crc = crc >>> 1;
        }
        byte = byte >>> 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(typeAndData), 0);

    return Buffer.concat([len, typeAndData, crc]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type (RGBA)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate icons
fs.writeFileSync('public/icon-192.png', createPNG(192));
fs.writeFileSync('public/icon-512.png', createPNG(512));
fs.writeFileSync('public/icon-maskable-512.png', createPNG(512));
console.log('Icons generated successfully!');
