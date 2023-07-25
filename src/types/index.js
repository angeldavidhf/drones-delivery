const { gql } = require('apollo-server-express');

const rootType = require('./rootType');
const droneType = require('./droneType');
const medicationType = require('./medicationType');
const auditLogType = require('./auditLogType');
const batteryLogType = require('./batteryLogType');

module.exports = gql`
    ${rootType}
    ${droneType}
    ${medicationType}
    ${auditLogType}
    ${batteryLogType}
`;