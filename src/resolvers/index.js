const dronesResolver = require('./dronesResolver');
const medicationsResolver = require('./medicationsResolver');
const dronesMedicationsResolver = require('./dronesMedicationsResolver');
const batteryLogsResolver = require('./batteryLogsResolver');

const resolvers = {
    Query: {
        ...dronesResolver.Query,
        ...medicationsResolver.Query,
        ...dronesMedicationsResolver.Query,
        ...batteryLogsResolver.Query
    },
    Mutation: {
        ...dronesResolver.Mutation,
        ...medicationsResolver.Mutation,
        ...dronesMedicationsResolver.Mutation,
        ...batteryLogsResolver.Mutation
    },
};

module.exports = resolvers;