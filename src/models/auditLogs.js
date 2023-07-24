const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const AuditLogs = sequelize.define('auditLogs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    droneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    medications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
    },
});

module.exports = AuditLogs;