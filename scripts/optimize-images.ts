import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateWebpImages() {
  const imagesDir = path.resolve(process.cwd(), 'public/images');
  if (!fs.existsSync(imagesDir)) {
    console.log('[optimize-images] Directory does not exist:', imagesDir);
    return;
  }

  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const filePath = path.join(imagesDir, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(imagesDir, `${baseName}.webp`);

      if (!fs.existsSync(webpPath)) {
        try {
          await sharp(filePath)
            .webp({ quality: 85 })
            .toFile(webpPath);
          console.log(`[optimize-images] Generated ${baseName}.webp`);
        } catch (err) {
          console.error(`[optimize-images] Failed to convert ${file}:`, err);
        }
      } else {
        console.log(`[optimize-images] ${baseName}.webp already exists`);
      }
    }
  }
}

generateWebpImages().catch((err) => {
  console.error('[optimize-images] Error:', err);
});
