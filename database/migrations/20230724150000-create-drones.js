'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('drones', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            serialNumber: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            weightLimit: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            batteryCapacity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('drones');
    },
};