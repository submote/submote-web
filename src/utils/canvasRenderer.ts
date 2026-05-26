// Highly optimized canvas rendering engine for Submote interactive preview.
// Synthesizes vector-based avatars or handles uploaded images with rich, stylized retro/cartoon transformations
// and real-time expression/emotive sticker overlays on the client-side.

import { EmoteStyle, EmoteExpression } from '../types';

interface DrawConfig {
  canvas: HTMLCanvasElement;
  style: EmoteStyle;
  expression: EmoteExpression;
  presetId: string;
  userImage: HTMLImageElement | null;
  outlineWidth: number; // 0 (None), 2 (Thin), 5 (Thick), 10 (Glow)
  zoom: number; // 0.5 to 2.0
  backgroundColor: string; // 'transparent', 'neon', 'obs'
  outlineColor?: string;
  resolution?: number; // 112, 56, 28, etc.
}

export function drawEmoteToCanvas({
  canvas,
  style,
  expression,
  presetId,
  userImage,
  outlineWidth,
  zoom,
  backgroundColor,
  outlineColor = '#ffffff',
  resolution = 256,
}: DrawConfig) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set physical drawing dimensions independent of display sizes
  canvas.width = resolution;
  canvas.height = resolution;
  ctx.imageSmoothingEnabled = style.id !== 'pixel';

  const width = resolution;
  const height = resolution;
  const cx = width / 2;
  const cy = height / 2;

  // 1. Draw Background
  ctx.clearRect(0, 0, width, height);

  if (backgroundColor === 'obs') {
    // Stream OBS Overlay test color (Chroma Key Green #00ff00)
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, width, height);
  } else if (backgroundColor === 'neon') {
    // Elegant radial synthwave background
    const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, width / 1.2);
    if (style.id === 'synthwave') {
      gradient.addColorStop(0, '#f43f5e');
      gradient.addColorStop(1, '#1e1b4b');
    } else if (style.id === 'cyberpunk') {
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(1, '#022c22');
    } else if (style.id === 'chibi') {
      gradient.addColorStop(0, '#ff79c6');
      gradient.addColorStop(1, '#4d1c5d');
    } else {
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#09090b');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else {
    // Transparent Background Checkerboard is simulated using CSS, so canvas is just cleared transparent.
    // However, if the style dictates, we can add a subtle backing shape for visibility.
    if (style.id === 'synthwave') {
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.fillRect(0, 0, width, height);
    }
  }

  // Draw decorative backgrounds (e.g. synthwave glowing sun, cyberpunk glitch grid)
  if (style.id === 'synthwave') {
    // Draw synthetic horizon sun
    ctx.beginPath();
    ctx.arc(cx, cy + height * 0.1, width * 0.35, Math.PI, 0);
    const sunGrad = ctx.createLinearGradient(0, cy - height * 0.25, 0, cy + height * 0.1);
    sunGrad.addColorStop(0, '#facc15');
    sunGrad.addColorStop(0.5, '#ea580c');
    sunGrad.addColorStop(1, '#db2777');
    ctx.fillStyle = sunGrad;
    ctx.fill();

    // Draw horizontal cuts in sun
    ctx.fillStyle = backgroundColor === 'obs' ? '#00ff00' : (backgroundColor === 'neon' ? '#1e1b4b' : 'rgba(9, 9, 11, 1)');
    for (let y = cy - height * 0.1; y < cy + height * 0.2; y += width * 0.08) {
      ctx.fillRect(cx - width * 0.4, y, width * 0.8, width * 0.025);
    }
  }

  // Save state for zoom and translate center
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(zoom, zoom);
  ctx.translate(-cx, -cy);

  // 2. Draw Source Character Profile (Uploaded Image or Vector Preset)
  if (userImage && userImage.complete && userImage.width > 0) {
    // Draw user uploaded face image cropped as square/circle
    const scale = Math.max(width / userImage.width, height / userImage.height);
    const w = userImage.width * scale;
    const h = userImage.height * scale;
    const x = (width - w) / 2;
    const y = (height - h) / 2;

    // Create a circular clipping mask so avatar is focused
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, width * 0.38, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(userImage, x, y, w, h);
    ctx.restore();
  } else {
    // Render robust high-tech vector avatar characters on-the-fly
    // This looks beautifully hand-crafted and represents actual avatars!
    ctx.save();

    // Base variables based on presetId
    let skinColor = '#fed7aa';
    let hairColor = '#ec4899';
    let earphoneColor = '#8b5cf6';
    let eyeColor = '#3b82f6';
    let hasCap = false;
    let capColor = '#10b981';
    let doubleBuns = false;
    let techShades = false;

    if (presetId === 'streamer_mia') {
      skinColor = '#fee2e2';
      hairColor = '#f472b6';
      earphoneColor = '#06b6d4';
      doubleBuns = true;
      eyeColor = '#06b6d4';
    } else if (presetId === 'gamer_kai') {
      skinColor = '#ffedd5';
      hairColor = '#3b82f6';
      earphoneColor = '#fbbf24';
      hasCap = true;
      capColor = '#10b981';
      techShades = true;
    } else if (presetId === 'cyber_v') {
      skinColor = '#f5f5f5';
      hairColor = '#94a3b8';
      earphoneColor = '#a855f7';
      techShades = true;
      eyeColor = '#a855f7';
    } else {
      // chibi_luna
      skinColor = '#fff1f2';
      hairColor = '#c084fc';
      earphoneColor = '#ec4899';
      doubleBuns = true;
      eyeColor = '#ec4899';
    }

    // A. Draw Back Hair / Buns
    ctx.fillStyle = hairColor;
    if (doubleBuns) {
      // Left Bun
      ctx.beginPath();
      ctx.arc(cx - width * 0.22, cy - height * 0.22, width * 0.14, 0, Math.PI * 2);
      ctx.fill();
      // Right Bun
      ctx.beginPath();
      ctx.arc(cx + width * 0.22, cy - height * 0.22, width * 0.14, 0, Math.PI * 2);
      ctx.fill();
    }

    // B. Draw Neck
    ctx.fillStyle = skinColor;
    ctx.fillRect(cx - width * 0.08, cy + height * 0.1, width * 0.16, height * 0.18);
    // Neck shadow
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(cx - width * 0.08, cy + height * 0.1, width * 0.16, height * 0.04);

    // C. Draw Head Base
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(cx, cy, width * 0.26, 0, Math.PI * 2);
    ctx.fill();

    // D. Draw Hair Bangs & details
    ctx.fillStyle = hairColor;
    ctx.beginPath();
    // Swirling hair bang
    ctx.arc(cx, cy - height * 0.05, width * 0.27, Math.PI * 1.1, Math.PI * 1.9);
    ctx.lineTo(cx + width * 0.26, cy);
    ctx.bezierCurveTo(cx + width * 0.1, cy - height * 0.1, cx, cy - height * 0.05, cx - width * 0.26, cy);
    ctx.closePath();
    ctx.fill();

    // E. Draw Eyes
    if (!techShades) {
      ctx.fillStyle = '#0f172a';
      // Left Eye
      ctx.beginPath();
      ctx.arc(cx - width * 0.1, cy - height * 0.02, width * 0.04, 0, Math.PI * 2);
      ctx.fill();
      // Right Eye
      ctx.beginPath();
      ctx.arc(cx + width * 0.1, cy - height * 0.02, width * 0.04, 0, Math.PI * 2);
      ctx.fill();

      // Eye sparkling reflections
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - width * 0.11, cy - height * 0.03, width * 0.015, 0, Math.PI * 2);
      ctx.arc(cx + width * 0.09, cy - height * 0.03, width * 0.015, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Tech Shaded Visors
      ctx.fillStyle = '#1e293b';
      // Retro synth visor look
      ctx.beginPath();
      ctx.roundRect(cx - width * 0.18, cy - height * 0.07, width * 0.36, height * 0.1, width * 0.02);
      ctx.fill();

      // Gleam reflection on visor
      ctx.strokeStyle = style.id === 'synthwave' ? '#06b6d4' : '#a855f7';
      ctx.lineWidth = width * 0.022;
      ctx.beginPath();
      ctx.moveTo(cx - width * 0.14, cy - height * 0.03);
      ctx.lineTo(cx + width * 0.14, cy - height * 0.03);
      ctx.stroke();
    }

    // F. Rosy cheeks
    ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
    ctx.beginPath();
    ctx.arc(cx - width * 0.14, cy + height * 0.03, width * 0.035, 0, Math.PI * 2);
    ctx.arc(cx + width * 0.14, cy + height * 0.03, width * 0.035, 0, Math.PI * 2);
    ctx.fill();

    // G. Default Mouth (will be overridden by expression)
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = width * 0.018;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy + height * 0.04, width * 0.03, 0, Math.PI);
    ctx.stroke();

    // H. Cap if specified
    if (hasCap) {
      ctx.fillStyle = capColor;
      ctx.beginPath();
      ctx.arc(cx, cy - height * 0.12, width * 0.22, Math.PI, 0);
      ctx.fill();
      // Cap Brim pointing sideways
      ctx.fillRect(cx - width * 0.3, cy - height * 0.14, width * 0.45, height * 0.04);
    }

    // I. Gaming Streamer Headset
    ctx.fillStyle = earphoneColor;
    // Earphone Band arching over head
    ctx.lineWidth = width * 0.03;
    ctx.strokeStyle = earphoneColor;
    ctx.beginPath();
    ctx.arc(cx, cy - height * 0.02, width * 0.27, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Left Cup
    ctx.beginPath();
    ctx.roundRect(cx - width * 0.3, cy - height * 0.08, width * 0.065, height * 0.16, width * 0.02);
    ctx.fill();
    // Right Cup
    ctx.beginPath();
    ctx.roundRect(cx + width * 0.235, cy - height * 0.08, width * 0.065, height * 0.16, width * 0.02);
    ctx.fill();

    // Cute microphone attachment for Vtuber/ASMR preset
    if (presetId === 'chibi_luna' || presetId === 'streamer_mia') {
      ctx.strokeStyle = '#4b5563';
      ctx.lineWidth = width * 0.015;
      ctx.beginPath();
      ctx.moveTo(cx - width * 0.27, cy + height * 0.02);
      ctx.quadraticCurveTo(cx - width * 0.18, cy + height * 0.12, cx - width * 0.08, cy + height * 0.08);
      ctx.stroke();
      // Mic pop filter
      ctx.fillStyle = earphoneColor;
      ctx.beginPath();
      ctx.arc(cx - width * 0.08, cy + height * 0.08, width * 0.025, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    ctx.restore();
  }

  // Restore zoom scale transform
  ctx.restore();

  // 3. APPLY STYLE TRANSFORMATION SHADERS (Canvas Pixel Manipulation)
  if (style.id === 'pixel') {
    // Generate an authentic pixelated 16-bit retro effect directly in raw canvas pixel bytes
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    // We adjust pixel size dynamically for pixel style based on resolution size
    // Lower resolution -> smaller block size, higher resolution -> larger block size for that retro vibe
    const blockSize = resolution >= 256 ? 6 : resolution >= 112 ? 3 : 1;

    if (blockSize > 1) {
      for (let y = 0; y < height; y += blockSize) {
        for (let x = 0; x < width; x += blockSize) {
          // Calculate average color in block
          let r = 0, g = 0, b = 0, a = 0, count = 0;
          for (let dy = 0; dy < blockSize; dy++) {
            for (let dx = 0; dx < blockSize; dx++) {
              const px = x + dx;
              const py = y + dy;
              if (px < width && py < height) {
                const idx = (py * width + px) * 4;
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                a += data[idx + 3];
                count++;
              }
            }
          }
          const avgR = Math.round(r / count);
          const avgG = Math.round(g / count);
          const avgB = Math.round(b / count);
          const avgA = Math.round(a / count);

          // Apply color quantization to make it feel like restricted 16-color palette
          const quantize = (c: number) => Math.round(c / 32) * 32;
          const qr = quantize(avgR);
          const qg = quantize(avgG);
          const qb = quantize(avgB);

          // Draw the square pixel blocks back onto imageData
          for (let dy = 0; dy < blockSize; dy++) {
            for (let dx = 0; dx < blockSize; dx++) {
              const px = x + dx;
              const py = y + dy;
              if (px < width && py < height) {
                const idx = (py * width + px) * 4;
                data[idx] = qr;
                data[idx + 1] = qg;
                data[idx + 2] = qb;
                data[idx + 3] = avgA > 120 ? 255 : 0; // Solid alpha binary gate for pixel transparency
              }
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // DRAW SCANLINES for nostalgic retro vibe
    ctx.strokeStyle = 'rgba(0,0,0,0.07)';
    ctx.lineWidth = 1;
    for (let slY = 0; slY < height; slY += 3) {
      ctx.beginPath();
      ctx.moveTo(0, slY);
      ctx.lineTo(width, slY);
      ctx.stroke();
    }
  } else if (style.id === 'synthwave') {
    // Synthwave duotone filter: map lightness to violet -> hot pink -> neon cyan
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 10) continue; // Skip transparency

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Grayscale luminescence weight
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;

      if (luma < 70) {
        // Dark areas map to dark indigo/purple
        data[i] = 30; // R
        data[i + 1] = 27; // G
        data[i + 2] = 75; // B
      } else if (luma < 170) {
        // Midtones map to vibrant hot pink fuchsia
        data[i] = 219;
        data[i + 1] = 39;
        data[i + 2] = 119;
      } else {
        // Highs map to glowing neon cyan
        data[i] = 6;
        data[i + 1] = 182;
        data[i + 2] = 212;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  } else if (style.id === 'cartoon') {
    // Posterize to cel-shading colors
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 10) continue;
      // Truncate to multiples of 64 for color bands
      data[i] = Math.min(255, Math.floor(data[i] / 64) * 64 + 32);
      data[i + 1] = Math.min(255, Math.floor(data[i + 1] / 64) * 64 + 32);
      data[i + 2] = Math.min(255, Math.floor(data[i + 2] / 64) * 64 + 32);
    }
    ctx.putImageData(imgData, 0, 0);
  } else if (style.id === 'cyberpunk') {
    // Cyber Kawaii acid tint map
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 10) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const luma = 0.21 * r + 0.72 * g + 0.07 * b;

      if (luma < 120) {
        // Acid dark violet base
        data[i] = 20;
        data[i + 1] = 4;
        data[i + 2] = 41;
      } else {
        // High glow acid neon green
        data[i] = 16;
        data[i + 1] = 185;
        data[i + 2] = 129;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // 4. DRAW OUTLINES (Twitch Optimizations demand a high-contrast outline for dark backgrounds)
  if (outlineWidth > 0) {
    ctx.save();
    // We can simulate a bold profile outline by creating heavy shadows or strokes on a temporary canvas,
    // or simply stroking of the avatar circle boundaries.
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = (outlineWidth * width) / 256;
    ctx.beginPath();
    ctx.arc(cx, cy, width * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    // Adding subtle outer neon auraglow
    if (outlineWidth > 4) {
      ctx.shadowColor = outlineColor;
      ctx.shadowBlur = width * 0.06;
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = (1 * width) / 256;
      ctx.stroke();
    }
    ctx.restore();
  }

  // 5. DRAW EMOTE EXPRESSION STICKERS AND TEXT (Drawn overlay on top of styling)
  ctx.save();
  const scaleRatio = width / 256;

  // Let's draw expression specific features
  if (expression.id === 'hype') {
    // Wide comic open-mouth expression drawn at center
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4 * scaleRatio;
    ctx.beginPath();
    ctx.ellipse(cx, cy + height * 0.06, width * 0.08, height * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bright orange tongue inside
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(cx, cy + height * 0.11, width * 0.06, height * 0.06, 0, Math.PI, 0);
    ctx.fill();

    // Comic "POG!" or "HYPE!" Speech Bubble Sticker
    ctx.save();
    ctx.translate(cx + width * 0.22, cy - height * 0.2);
    ctx.rotate(0.12);

    // Comic explode star shape background
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3 * scaleRatio;
    ctx.beginPath();
    const spikes = 12;
    const outerRadius = width * 0.18;
    const innerRadius = width * 0.11;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let x = Math.cos(rot) * outerRadius;
      let y = Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Sticker Text
    ctx.fillStyle = '#000000';
    ctx.font = `italic bold ${Math.floor(22 * scaleRatio)}px "Space Grotesk", Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();

  } else if (expression.id === 'rage') {
    // Red forehead boiling anger veins
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4 * scaleRatio;
    ctx.lineCap = 'round';

    // Top-left red anger curved veins icon
    const vx = cx - width * 0.14;
    const vy = cy - height * 0.14;
    ctx.beginPath();
    ctx.arc(vx, vy, width * 0.03, Math.PI * 0.5, Math.PI * 1.5, false);
    ctx.clearRect(vx, vy, width * 0.03, height * 0.03); // clean shape cut
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(vx, vy, width * 0.03, 0, Math.PI);
    ctx.stroke();

    // Fire flame details in corners
    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.beginPath();
    ctx.moveTo(cx - width * 0.45, height);
    ctx.quadraticCurveTo(cx - width * 0.35, cy + height * 0.15, cx - width * 0.25, height);
    ctx.quadraticCurveTo(cx, cy + height * 0.25, cx + width * 0.25, height);
    ctx.quadraticCurveTo(cx + width * 0.38, cy + height * 0.12, cx + width * 0.45, height);
    ctx.closePath();
    ctx.fill();

    // "SALT!!" Banner on bottom
    ctx.save();
    ctx.translate(cx, cy + height * 0.34);
    ctx.rotate(-0.06);

    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * scaleRatio;
    ctx.fillRect(-width * 0.32, -height * 0.1, width * 0.64, height * 0.18);
    ctx.strokeRect(-width * 0.32, -height * 0.1, width * 0.64, height * 0.18);

    ctx.fillStyle = '#ffffff';
    ctx.font = `black bold ${Math.floor(21 * scaleRatio)}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();

  } else if (expression.id === 'lurk') {
    // Dark assassin shadow covering bottom face
    const shadowGrad = ctx.createLinearGradient(0, cy - height * 0.02, 0, height);
    shadowGrad.addColorStop(0, 'rgba(15, 23, 42, 0)');
    shadowGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, cy - height * 0.02, width, height * 0.52);

    // Glowing yellow sneaky surveillance dots
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(cx - width * 0.1, cy + height * 0.16, width * 0.035, 0, Math.PI * 2);
    ctx.arc(cx + width * 0.1, cy + height * 0.16, width * 0.035, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // reset

    // "LURK" banner
    ctx.save();
    ctx.translate(cx, cy + height * 0.34);
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2 * scaleRatio;
    ctx.fillRect(-width * 0.28, -height * 0.09, width * 0.56, height * 0.16);
    ctx.strokeRect(-width * 0.28, -height * 0.09, width * 0.56, height * 0.16);

    ctx.fillStyle = '#22c55e';
    ctx.font = `bold ${Math.floor(18 * scaleRatio)}px var(--font-mono), monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();

  } else if (expression.id === 'smug') {
    // "Deal with it" pixelated dark shades sliding down
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2 * scaleRatio;

    // Eyewear rectangular blocks
    ctx.fillRect(cx - width * 0.21, cy - height * 0.06, width * 0.17, height * 0.075);
    ctx.strokeRect(cx - width * 0.21, cy - height * 0.06, width * 0.17, height * 0.075);

    ctx.fillRect(cx + width * 0.04, cy - height * 0.06, width * 0.17, height * 0.075);
    ctx.strokeRect(cx + width * 0.04, cy - height * 0.06, width * 0.17, height * 0.075);

    // Bridge strip
    ctx.fillRect(cx - width * 0.04, cy - height * 0.03, width * 0.08, height * 0.02);

    // Dynamic Smirk Mouth curve at bottom
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 4 * scaleRatio;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - width * 0.08, cy + height * 0.05);
    ctx.quadraticCurveTo(cx + width * 0.08, cy + height * 0.03, cx + width * 0.09, cy + height * 0.08);
    ctx.stroke();

    // "EZ CLAP" glowing bottom banner
    ctx.save();
    ctx.translate(cx, cy + height * 0.35);
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3 * scaleRatio;
    ctx.beginPath();
    ctx.roundRect(-width * 0.32, -height * 0.1, width * 0.64, height * 0.18, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = `italic bold ${Math.floor(18 * scaleRatio)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();

  } else if (expression.id === 'love') {
    // Sparkling pink glowing hearts overlaying
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#f472b6';
    ctx.shadowBlur = 12 * scaleRatio;

    // Draw left heart shape
    const h1x = cx - width * 0.12;
    const h1y = cy - height * 0.04;
    const drawHeart = (hx: number, hy: number, scale: number) => {
      ctx.save();
      ctx.translate(hx, hy);
      ctx.scale(scale * scaleRatio, scale * scaleRatio);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Bezier curve hearts formulation
      ctx.bezierCurveTo(-10, -10, -25, 0, 0, 20);
      ctx.bezierCurveTo(25, 0, 10, -10, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    drawHeart(h1x, h1y, 1.3);
    // Draw right heart shape
    const h2x = cx + width * 0.12;
    const h2y = cy - height * 0.04;
    drawHeart(h2x, h2y, 1.3);

    // Floating minor elements
    ctx.fillStyle = '#f43f5e';
    drawHeart(cx - width * 0.28, cy - height * 0.18, 0.6);
    drawHeart(cx + width * 0.28, cy - height * 0.12, 0.7);

    ctx.shadowBlur = 0; // reset

    // "LOVE" bubble layout banner
    ctx.save();
    ctx.translate(cx, cy + height * 0.33);
    ctx.fillStyle = '#fff0f6';
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 4 * scaleRatio;
    ctx.beginPath();
    ctx.roundRect(-width * 0.26, -height * 0.09, width * 0.52, height * 0.16, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ec4899';
    ctx.font = `bold ${Math.floor(19 * scaleRatio)}px var(--font-display), sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();

  } else if (expression.id === 'cry') {
    // Render streaming blue pixel/neon droplet tears downwards
    ctx.fillStyle = '#38bdf8';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5 * scaleRatio;

    // Draw thick tears cascading on left and right side
    const lTx = cx - width * 0.1;
    const rTx = cx + width * 0.1;

    ctx.beginPath();
    // Left teardrop path
    ctx.moveTo(lTx, cy - height * 0.02);
    ctx.bezierCurveTo(lTx - width * 0.04, cy + height * 0.05, lTx - width * 0.05, cy + height * 0.22, lTx - width * 0.01, cy + height * 0.28);
    ctx.bezierCurveTo(lTx + width * 0.02, cy + height * 0.22, lTx + width * 0.01, cy + height * 0.05, lTx, cy - height * 0.02);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    // Right teardrop path
    ctx.moveTo(rTx, cy - height * 0.02);
    ctx.bezierCurveTo(rTx + width * 0.04, cy + height * 0.05, rTx + width * 0.05, cy + height * 0.22, rTx + width * 0.01, cy + height * 0.28);
    ctx.bezierCurveTo(rTx - width * 0.02, cy + height * 0.22, rTx - width * 0.01, cy + height * 0.05, rTx, cy - height * 0.02);
    ctx.fill();
    ctx.stroke();

    // Dark blue storm cloud above
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.arc(cx - width * 0.2, cy - height * 0.24, width * 0.1, 0, Math.PI * 2);
    ctx.arc(cx - width * 0.1, cy - height * 0.28, width * 0.11, 0, Math.PI * 2);
    ctx.arc(cx + width * 0.08, cy - height * 0.27, width * 0.12, 0, Math.PI * 2);
    ctx.arc(cx + width * 0.22, cy - height * 0.23, width * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // "SADGE CRY" label banner
    ctx.save();
    ctx.translate(cx, cy + height * 0.34);
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3 * scaleRatio;
    ctx.fillRect(-width * 0.3, -height * 0.09, width * 0.6, height * 0.16);
    ctx.strokeRect(-width * 0.3, -height * 0.09, width * 0.6, height * 0.16);

    ctx.fillStyle = '#ffffff';
    ctx.font = `black italic bold ${Math.floor(18 * scaleRatio)}px var(--font-display), sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(expression.stickerText, 0, 0);
    ctx.restore();
  }

  ctx.restore();
}
