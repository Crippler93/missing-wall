const { sequelize } = require('../models/index');

const createService = (model, db) => ({
  async getAllMissings(offset = 0, limit = 1) {
    const missings = await model.findAll({
      attributes: ['id', 'name', 'missingDate'],
      include: {
        model: db.models.Images,
        attributes: ['url'],
      },
      offset,
      limit,
    });
    return missings;
  },
  async getTotalCountMissing() {
    const total = await model.count();
    return total;
  },
  async saveMissing(missing) {
    const createdMissing = await model.create(missing);
    return createdMissing;
  },
  async saveImages(missingId, urls = []) {
    const images = urls.map((url) => ({
      url,
      MissingId: missingId,
    }));

    const createdImages = await db.models.Images.bulkCreate(images);
    return createdImages;
  },
});

module.exports = createService(sequelize.models.Missing, sequelize);
