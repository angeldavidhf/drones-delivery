const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'drone_delivery',
});

module.exports = sequelize;