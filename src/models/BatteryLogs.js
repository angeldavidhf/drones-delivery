const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Drones = require("./Drones");

const BatteryLogs = sequelize.define('battery_logs', {
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
    batteryLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

BatteryLogs.belongsTo(Drones, {
    foreignKey: 'droneId',
    as: 'drone',
});


module.exports = BatteryLogs;