module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      url: Sequelize.STRING,
      publicId: Sequelize.STRING,
      MissingId: {
        type: Sequelize.UUID,
        references: {
          model: 'missings',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'set null',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images');
  },
};
