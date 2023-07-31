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

    type LoadedMedication {
        droneId: ID!
        medicationId: ID!
        batteryUse: Int!
        deliveryStatus: String!
    }

    type Query {
        getMedicationsForDrone(droneId: ID!): [DroneMedication!]!
        getDronesForMedication(medicationId: ID!): [DroneMedication!]!
    }

    type Mutation {
        loadMedicationsToDrone(droneId: ID!, medications: [ID!]!): [LoadedMedication!]!
    }
`;

module.exports = droneMedicationTypes;
