const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const Drones = require("./Drones");
const Medications = require("./Medications");

const DronesMedications = sequelize.define('drones_medications', {
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
        defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
    },
});

DronesMedications.belongsTo(Drones, {
    foreignKey: 'droneId',
    as: 'drone',
});

DronesMedications.belongsTo(Medications, {
    foreignKey: 'medicationId',
    as: 'medication',
});

module.exports = DronesMedications;