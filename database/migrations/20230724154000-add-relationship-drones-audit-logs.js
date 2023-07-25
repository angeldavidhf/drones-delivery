'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('auditLogs', 'droneId', {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'drones',
                key: 'id',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('auditLogs', 'droneId');
    },
};