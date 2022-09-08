const { Op } = require('sequelize');
const ItemNotFound = require('../errors/ItemNotFound');
const { sequelize } = require('../models/index');
const { uploadImages, deleteImages } = require('./upload.service');

const createService = (model, db) => ({
  async getAllMissings({ offset = 0, limit = 1 }) {
    offset = Number(offset);
    limit = Number(limit);
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
  async saveImages(missingId, files = []) {
    const images = files.map(({ url, publicId }) => ({
      url,
      publicId,
      MissingId: missingId,
    }));

    const createdImages = await db.models.Images.bulkCreate(images);
    return createdImages;
  },

  async getMissingById(id) {
    const missing = await model.findByPk(id, {
      include: {
        model: db.models.Images,
      },
    });
    if (missing === null) {
      throw new ItemNotFound();
    }
    return missing;
  },

  async updateMissing(id, { missing, images }) {
    const dbMissing = await model.findByPk(id, {
      attributes: ['name', 'description', 'missingDate'],
    });
    if (dbMissing === null) throw new ItemNotFound();
    const newMissing = {
      name: missing.name || dbMissing.name,
      description: missing.description || dbMissing.description,
      missingDate: missing.missingDate || dbMissing.missingDate,
    };

    const imagesToRemove = images.filter((image) => image.remove);
    const publicIdsToRemove = imagesToRemove.map((image) => image.publicId);
    const idsToRemove = imagesToRemove.map((image) => image.id);
    await deleteImages(publicIdsToRemove);
    await db.models.Images.destroy({
      where: {
        id: {
          [Op.in]: [idsToRemove],
        },
      },
    });
    await model.update(newMissing, {
      where: {
        id,
      },
    });
  },
});

module.exports = createService(sequelize.models.Missing, sequelize);
