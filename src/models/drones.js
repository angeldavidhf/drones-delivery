const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const Medications = require('./medications');

const Drones = sequelize.define('drones', {
    serialNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 100],
        },
    },
    model: {
        type: DataTypes.ENUM('LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'),
        allowNull: false,
    },
    weightLimit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 500,
        },
    },
    batteryCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
    state: {
        type: DataTypes.ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'),
        allowNull: false,
        defaultValue: 'IDLE',
    },
});

Drones.hasMany(Medications, {
    foreignKey: 'droneId',
    as: 'medications',
});


module.exports = Drones;