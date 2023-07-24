'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('medications', [
      {
        name: 'Medicine 1',
        weight: 50,
        code: 'MED001',
        image: 'url_to_image1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medicine 2',
        weight: 75,
        code: 'MED002',
        image: 'url_to_image2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more medications here if needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medications', null, {});
  },
};