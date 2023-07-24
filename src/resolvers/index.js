const droneResolver = require('./droneResolver');
const medicationResolver = require('./medicationResolver');

const resolvers = {
    Query: {
        ...droneResolver.Query,
        ...medicationResolver.Query,
    },
    Mutation: {
        ...droneResolver.Mutation,
        ...medicationResolver.Mutation,
    },
};

module.exports = resolvers;