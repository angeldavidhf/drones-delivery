const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('drone_delivery', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;