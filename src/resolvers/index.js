const droneResolver = require('./droneResolver');
const medicationResolver = require('./medicationResolver');
const auditLogResolver = require('./auditLogResolver');
const batteryLogResolver = require('./batteryLogResolver');

const resolvers = {
    Query: {
        ...droneResolver.Query,
        ...medicationResolver.Query,
        ...auditLogResolver.Query,
        ...batteryLogResolver.Query
    },
    Mutation: {
        ...droneResolver.Mutation,
        ...medicationResolver.Mutation,
        ...auditLogResolver.Mutation,
        ...batteryLogResolver.Mutation
    },
};

module.exports = resolvers;