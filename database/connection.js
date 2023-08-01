const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('drones_delivery_db', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    //logging: console.log
});

module.exports = sequelize;