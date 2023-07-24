const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const BatteryLogs = sequelize.define('batteryLogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    droneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    batteryLevel: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
    },
});

module.exports = BatteryLogs;