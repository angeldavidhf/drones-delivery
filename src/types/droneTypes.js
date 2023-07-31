const { gql } = require('apollo-server-express');

const droneTypes = gql`
    type Drone {
        id: ID!
        serialNumber: String!
        model: String!
        weightLimit: Float!
        battery: Int!
        state: String!
        flagDelete: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    input CreateDroneInput {
        serialNumber: String!
        model: String!
        weightLimit: Float!
        battery: Int!
    }

    input UpdateDroneInput {
        id: ID!
        model: String!
        weightLimit: Float!
        battery: Int!
    }

    type Query {
        getAllDrones: [Drone!]!
        getDroneById(id: ID!): Drone
    }

    type Mutation {
        createDrone(input: CreateDroneInput!): Drone
        updateDrone(input: UpdateDroneInput!): Drone
        changeStateDrone(id: ID!): Boolean
        temporaryDeleteDrone(id: ID!): Boolean
        permanentDeleteDrone(id: ID!): Boolean
    }
`

module.exports = droneTypes;
