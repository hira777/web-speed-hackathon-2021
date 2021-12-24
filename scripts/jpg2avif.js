const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const IMAGE_BASE_PATH = path.resolve(__dirname, '../public/images');

async function main() {
  const images = fs.readdirSync(IMAGE_BASE_PATH).filter((name) => name.indexOf('.jpg') > -1);
  const profileImages = fs.readdirSync(`${IMAGE_BASE_PATH}/profiles`).filter((name) => name.indexOf('.jpg') > -1);
  const promises = images
    .map((image) => {
      const input = path.resolve(IMAGE_BASE_PATH, image);
      const output = input.replace('jpg', 'avif');

      return sharp(input).resize({ width: 600 }).avif().toFile(output);
    })
    .concat(
      profileImages.map((image) => {
        const input = path.resolve(IMAGE_BASE_PATH, `profiles/${image}`);
        const output = input.replace('jpg', 'avif');

        return sharp(input).resize({ width: 128 }).avif().toFile(output);
      }),
    );
  await Promise.all(promises);
}

main();
