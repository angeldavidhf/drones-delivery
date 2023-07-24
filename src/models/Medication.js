const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medication = sequelize.define('medications', {
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
});

module.exports = Medication;