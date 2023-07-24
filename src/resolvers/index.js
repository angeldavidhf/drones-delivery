const droneResolvers = require('./droneResolvers');
const medicationResolvers = require('./medicationResolvers');

const resolvers = {
    Query: {
        ...droneResolvers.Query,
        ...medicationResolvers.Query,
    },
    Mutation: {
        ...droneResolvers.Mutation,
        ...medicationResolvers.Mutation,
    },
};

module.exports = resolvers;