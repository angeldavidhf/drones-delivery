const { gql } = require('apollo-server-express');

const medicationType = gql`
    type Medication {
        id: ID!
        name: String!
        weight: Float!
        code: String!
        image: String
        drone: Drone
    }

    input MedicationInput {
        id: ID!
        name: String!
        weight: Float!
        code: String!
        image: String
    }

    input CreateMedicationInput {
        name: String!
        weight: Float!
        code: String!
        image: String
    }

    input UpdateMedicationInput {
        name: String
        weight: Float
        code: String
        image: String
    }

    extend type Query {
        medications: [Medication!]!
        medication(id: ID!): Medication
    }

    extend type Mutation {
        createMedication(input: CreateMedicationInput!): Medication!
        updateMedication(id: ID!, input: UpdateMedicationInput!): Medication!
        deleteMedication(id: ID!): Boolean!
    }
`;

module.exports = medicationType;