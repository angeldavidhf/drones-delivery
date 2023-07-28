'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('medications', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z0-9-_]+$/,
                },
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[A-Z0-9_]+$/,
                },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            flagDelete: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.dropTable('medications');
    }
};
