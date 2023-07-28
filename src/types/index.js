const { gql } = require('apollo-server-express');

const droneTypes = require('./droneTypes');
const medicationTypes = require('./medicationTypes');
const droneMedicationTypes = require('./droneMedicationTypes');
const batteryLogTypes = require('./batteryLogTypes');

const rootTypes = require('./rootTypes');

module.exports = gql`
    ${droneTypes}
    ${medicationTypes}
    ${droneMedicationTypes}
    ${batteryLogTypes}
    ${rootTypes}
`;