const { gql } = require('apollo-server-express');

const batteryLogTypes = gql`
    type BatteryLog {
        id: ID!
        drone: Drone!
        batteryLevel: Int!
        createdAt: String!
        updatedAt: String!
    }

    input CreateBatteryLogInput {
        droneId: ID!
        batteryLevel: Int!
    }
    
    input UpdateBatteryLogInput {
        id: ID!
        droneId: ID!
        batteryLevel: Int!
    }

    type Query {
        getAllBatteryLogs: [BatteryLog!]!
        getBatteryLogsForDrone(droneId: ID!): [BatteryLog!]!
    }

    type Mutation {
        createBatteryLog(input: CreateBatteryLogInput!): BatteryLog
        updateBatteryLog(input: UpdateBatteryLogInput!): BatteryLog
        deleteBatteryLogsForDrone(droneId: ID!): Boolean
    }
`;

module.exports = batteryLogTypes;