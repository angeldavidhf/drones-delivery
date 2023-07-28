'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('drones_medications', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            droneId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'drones',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            medicationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'medications',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            batteryUse: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            deliveryStatus: {
                type: DataTypes.ENUM('LOADED', 'DELIVERED'),
                allowNull: false,
                defaultValue: 'LOADED',
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
        await queryInterface.dropTable('drones_medications');
    }
};
