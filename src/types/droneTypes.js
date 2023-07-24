const { gql } = require('apollo-server-express');

const droneTypes = gql`
    type Drone {
        id: ID!
        serialNumber: String!
        model: String!
        weightLimit: Float!
        batteryCapacity: Int!
        state: String!
    }

    input CreateDroneInput {
        serialNumber: String!
        model: String!
        weightLimit: Float!
        batteryCapacity: Int!
        state: String!
    }

    input UpdateDroneInput {
        serialNumber: String
        model: String
        weightLimit: Float
        batteryCapacity: Int
        state: String
    }

    extend type Query {
        drones: [Drone!]!
        drone(id: ID!): Drone
    }

    extend type Mutation {
        createDrone(input: CreateDroneInput!): Drone!
        updateDrone(id: ID!, input: UpdateDroneInput!): Drone!
        deleteDrone(id: ID!): Boolean!
    }
`;

module.exports = droneTypes;