const { sequelize } = require('../models/index');

const createService = (model, db) => ({
  async getAllMissings() {
    const missings = await model.findAll({
      attributes: ['id', 'name', 'missingDate'],
      include: {
        model: db.models.Images,
        attributes: ['url'],
      },
    });
    return missings;
  },
});

module.exports = createService(sequelize.models.Missing, sequelize);
