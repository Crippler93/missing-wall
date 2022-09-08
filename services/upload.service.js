const cloudinary = require('cloudinary').v2;
const { error: errorLogger } = require('../logger');

cloudinary.config({
  secure: true,
});

const uploadRequest = async (imagePath, folder) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    folder,
  };
  let result = null;
  try {
    result = await cloudinary.uploader.upload(imagePath, options);
  } catch (e) {
    errorLogger.error(e);
  }
  return result;
};

const uploadImages = async (files = []) => {
  const uploads = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadRequest(files[i].path, 'missing');
    uploads.push({ url: result?.url, publicId: result?.public_id });
  }
  return uploads;
};

const deleteImages = async (publicIDs = []) => {
  for (let i = 0; i < publicIDs.length; i++) {
    await cloudinary.uploader.destroy(publicIDs[i]);
  }
};

module.exports = {
  uploadImages,
  deleteImages,
};
