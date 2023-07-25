const { gql } = require('apollo-server-express');

const batteryLogType = gql`
    type BatteryLog {
        id: ID!
        droneId: ID!
        batteryLevel: Float!
        createdAt: String!
    }

    input CreateBatteryLogInput {
        droneId: ID!
        batteryLevel: Float!
    }

    extend type Mutation {
        createBatteryLog(input: CreateBatteryLogInput!): BatteryLog!
    }
`;

module.exports = batteryLogType;