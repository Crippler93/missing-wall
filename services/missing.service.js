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
});

module.exports = createService(sequelize.models.Missing, sequelize);
