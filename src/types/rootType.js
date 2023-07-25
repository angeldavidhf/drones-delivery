const { gql } = require('apollo-server-express');

const rootType = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

module.exports = rootType;