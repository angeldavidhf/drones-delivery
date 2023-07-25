const { gql } = require('apollo-server-express');

const auditLogType = gql`
    type AuditLog {
        id: ID!
        droneId: ID!
        medications: [String!]!
        createdAt: String!
    }

    input CreateAuditLogInput {
        droneId: ID!
        medications: [String!]!
    }

    extend type Mutation {
        createAuditLog(input: CreateAuditLogInput!): AuditLog!
    }
`;

module.exports = auditLogType;