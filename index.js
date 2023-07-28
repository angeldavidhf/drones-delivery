const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const sequelize = require('./database/connection');
const typeDefs = require('./src/types');
const resolvers = require('./src/resolvers');

const { initBatteryCheckTask } = require('./src/controllers/DronesController');

async function startServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    server.applyMiddleware({ app });

    sequelize
        .sync()
        .then(() => {
            console.log(':::::::::::::::::::::. Database connected .:::::::::::::::::::::');
        })
        .catch((err) => {
            console.error('Database connection error:', err);
        });

    initBatteryCheckTask();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`:::::::::::::::::::::. Server started on http://localhost:${PORT}${server.graphqlPath} .:::::::::::::::::::::`);
    });
}

startServer().catch(error => {
    console.error('Error starting server:', error);
});