const { Missing } = require('../entities');
const missingService = require('../services/missing.service');
const uploadService = require('../services/upload.service');
const BadRequest = require('../errors/BadRequest');

module.exports = {
  async validateBodyAndCreateMissing(body, files) {
    let missing;
    try {
      missing = new Missing(body);
    } catch (e) {
      throw new BadRequest(e);
    }
    const createdMissing = await missingService.saveMissing(missing);
    let images = [];
    if (files && files.length > 0) {
      const filesCreated = await uploadService.uploadImages(files);
      images = await missingService.saveImages(createdMissing.id, filesCreated);
    }
    return { missing, images };
  },
};
