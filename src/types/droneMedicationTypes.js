const { gql } = require('apollo-server-express');

const droneMedicationTypes = gql`
    type DroneMedication {
        id: ID!
        drone: Drone!
        medication: Medication!
        batteryUse: Int!
        deliveryStatus: String!
        createdAt: String!
        updatedAt: String!
    }

    input CreateDroneMedicationInput {
        droneId: ID!
        medicationId: ID!
        batteryUse: Int!
        deliveryStatus: String!
    }

    input UpdateDroneMedicationInput {
        id: ID!
        batteryUse: Int!
        deliveryStatus: String!
    }

    type Query {
        getAllDroneMedications: [DroneMedication!]!
        getDroneMedicationById(id: ID!): DroneMedication
    }

    type Mutation {
        createDroneMedication(input: CreateDroneMedicationInput!): DroneMedication
        updateDroneMedication(input: UpdateDroneMedicationInput!): DroneMedication
        deleteDroneMedication(id: ID!): Boolean
    }
`;

module.exports = droneMedicationTypes;
