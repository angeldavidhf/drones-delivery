const { gql } = require('apollo-server-express');

const rootTypes = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

module.exports = rootTypes;