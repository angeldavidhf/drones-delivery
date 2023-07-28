const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Medications = sequelize.define('medications', {
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
        unique: true,
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
        defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
    },
});

Medications.associate = ({ DronesMedications }) => {
    Medications.hasMany(DronesMedications, {
        foreignKey: 'medicationId',
        as: 'drones_medications'
    });
};


module.exports = Medications;