const { gql } = require('apollo-server-express');

const rootType = gql`
    type AuditLog {
        id: ID!
        droneId: Int!
        medications: [String!]!
        createdAt: String!
    }

    type BatteryLog {
        id: ID!
        droneId: Int!
        batteryLevel: Float!
        createdAt: String!
    }
    
    type Query {
        _empty: String # Este es solo un tipo ficticio para que el Query no esté vacío
    }

    type Mutation {
        _empty: String # Este es solo un tipo ficticio para que el Mutation no esté vacío
    }
`;

module.exports = rootType;