'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('batteryLogs', [
            {
                droneId: 1,
                batteryLevel: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                droneId: 2,
                batteryLevel: 80,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            // Add more battery logs here if needed
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('batteryLogs', null, {});
    },
};