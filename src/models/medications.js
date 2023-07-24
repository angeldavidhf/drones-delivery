const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const Drones = require('./drones');

const Medications = sequelize.define('medications', {
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
        validate: {
            min: 0,
        },
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
});


Medications.associate = (models) => {
    Medications.belongsTo(models.Drones, { foreignKey: 'droneId' });
};

module.exports = Medications;