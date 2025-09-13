const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  return await imagekit.upload({
    file: fileBuffer.toString("base64"), // convert uploaded video buffer to base64
    fileName: fileName + ".mp4",
  });
}

module.exports = { uploadFile };
