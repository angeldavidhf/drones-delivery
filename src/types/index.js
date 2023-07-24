const { gql } = require('apollo-server-express');

const rootType = require('./rootType');
const droneType = require('./droneType');
const medicationType = require('./medicationType');

module.exports = gql`
    ${rootType}
    ${droneType}
    ${medicationType}
`;