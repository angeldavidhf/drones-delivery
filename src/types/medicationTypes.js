const { gql } = require('apollo-server-express');

const medicationTypes = gql`
    type Medication {
        id: ID!
        name: String!
        weight: Float!
        code: String!
        image: String
        flagDelete: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    input CreateMedicationInput {
        name: String!
        weight: Float!
        code: String!
    }

    input UpdateMedicationInput {
        id: ID!
        name: String!
        weight: Float!
        code: String!
    }

    type Query {
        getAllMedications: [Medication!]!
        getMedicationById(id: ID!): Medication
    }

    type Mutation {
        createMedication(input: CreateMedicationInput!): Medication
        updateMedication(input: UpdateMedicationInput!): Medication
        temporaryDeleteMedication(id: ID!): Boolean
        permanentDeleteMedication(id: ID!): Boolean
    }
`;

module.exports = medicationTypes;
