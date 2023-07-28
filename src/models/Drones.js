const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Drones = sequelize.define('drones', {
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
    battery: {
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

Drones.associate = ({ BatteryLogs, DronesMedications }) => {
    Drones.hasMany(BatteryLogs, {
        foreignKey: 'droneId',
        as: 'battery_logs'
    });

    Drones.hasMany(DronesMedications, {
        foreignKey: 'droneId',
        as: 'drones_medications'
    });
};

module.exports = Drones;