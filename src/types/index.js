const { gql } = require('apollo-server-express');
const droneTypes = require('./droneTypes');
const medicationTypes = require('./medicationTypes');

const rootTypes = gql`
    type Query {
        _empty: String # Este es solo un tipo ficticio para que el Query no esté vacío
    }

    type Mutation {
        _empty: String # Este es solo un tipo ficticio para que el Mutation no esté vacío
    }
`;

module.exports = [rootTypes, droneTypes, medicationTypes];