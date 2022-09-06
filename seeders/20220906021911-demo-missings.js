const { randomUUID } = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const missingsIds = [];

    for (let i = 0; i < 10; i++) {
      missingsIds.push(randomUUID());
    }

    await queryInterface.bulkInsert('missings', [
      {
        id: missingsIds[0],
        name: 'Juan Perez',
        description: 'A small person',
        missingDate: new Date(2022, 3, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[1],
        name: 'Pedro Perez',
        description: 'A tall person',
        missingDate: new Date(2022, 3, 11),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[2],
        name: 'Paola Perez',
        description: 'A fat person',
        missingDate: new Date(2022, 3, 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[3],
        name: 'Marco Perez',
        description: 'A tiny person',
        missingDate: new Date(2022, 3, 13),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[4],
        name: 'Carola Perez',
        description: 'A angry person',
        missingDate: new Date(2022, 3, 14),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[5],
        name: 'Palmira Perez',
        description: 'A talking person',
        missingDate: new Date(2022, 3, 15),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[6],
        name: 'Raisa Perez',
        description: 'A long hair person',
        missingDate: new Date(2022, 3, 16),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[7],
        name: 'Pablo Perez',
        description: 'A calm person',
        missingDate: new Date(2022, 3, 17),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[8],
        name: 'Coral Perez',
        description: 'A crazy person',
        missingDate: new Date(2022, 3, 18),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: missingsIds[9],
        name: 'Eduardo Perez',
        description: 'A smart person',
        missingDate: new Date(2022, 3, 19),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('images', [
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[0],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[1],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[2],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[3],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[4],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[5],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[6],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[7],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[8],
      },
      {
        id: randomUUID(),
        url: 'http://via.placeholder.com/640x360',
        createdAt: new Date(),
        updatedAt: new Date(),
        MissingId: missingsIds[9],
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('missings', null, {});
  },
};
