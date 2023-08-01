'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('drones', [
      {
        serialNumber: 'DRN001',
        model: 'LightWeight',
        weightLimit: 200,
        battery: 80,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: 'DRN002',
        model: 'MiddleWeight',
        weightLimit: 300,
        battery: 100,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: 'DRN003',
        model: 'MiddleWeight',
        weightLimit: 300,
        battery: 100,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: 'DRN004',
        model: 'CruiserWeight',
        weightLimit: 400,
        battery: 100,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: 'DRN005',
        model: 'HeavyWeight',
        weightLimit: 500,
        battery: 100,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serialNumber: 'DRN006',
        model: 'HeavyWeight',
        weightLimit: 500,
        battery: 100,
        state: 'IDLE',
        flagDelete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('drones', null, {});
  },
};

