const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Drone = sequelize.define('drones', {
    serialNumber: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    model: {
        type: DataTypes.ENUM('LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'),
        allowNull: false,
    },
    weightLimit: {
        type: DataTypes.FLOAT,
        allowNull: false,
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

module.exports = Drone;