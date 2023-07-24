'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('drones', [
            {
                serialNumber: 'DRN001',
                model: 'Lightweight',
                weightLimit: 300,
                batteryCapacity: 100,
                state: 'IDLE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                serialNumber: 'DRN002',
                model: 'Middleweight',
                weightLimit: 400,
                batteryCapacity: 80,
                state: 'IDLE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Add more drones here if needed
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('drones', null, {});
    },
};