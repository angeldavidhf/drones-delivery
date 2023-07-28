const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('drone_delivery_db', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;