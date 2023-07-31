'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('medications', [
      {
        name: 'Medication-A',
        weight: 10,
        code: 'MED001',
        image: 'image_medication.jpg',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medication-B',
        weight: 20,
        code: 'MED002',
        image: 'image_medication.jpg',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medication-C',
        weight: 30,
        code: 'MED003',
        image: 'image_medication.jpg',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medication-D',
        weight: 40,
        code: 'MED004',
        image: 'image_medication.jpg',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medication-E',
        weight: 50,
        code: 'MED005',
        image: 'image_medication.jpg',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medications', null, {});
  },
};

