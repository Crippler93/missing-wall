const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Missing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Missing.hasMany(models.Images);
      models.Images.belongsTo(models.Missing);
      console.log('models', models);
    }
  }
  Missing.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      missingDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Missing',
    },
  );
  return Missing;
};
