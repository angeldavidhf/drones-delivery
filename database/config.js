module.exports = {
  development: {
    username: "admin",
    password: "admin",
    database: "drones_delivery_db",
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    dialectOptions: {
        constraint: false,
    },
  },
  test: {
    username: "admin",
    password: "admin",
    database: "drones_delivery_db",
    host: "localhost",
    dialect: "postgres",
    port: 5432
  },
  production: {
    username: "admin",
    password: "admin",
    database: "drones_delivery_db",
    host: "localhost",
    dialect: "postgres",
    port: 5432
  }
};