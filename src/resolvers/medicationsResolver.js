const { ApolloError } = require('apollo-server-express');
const MedicationsController = require('../controllers/MedicationsController');

const medicationsResolver = {
    Query: {
        getAllMedications: async () => {
            try {
                return await MedicationsController.getAllMedications();
            } catch (error) {
                throw new ApolloError('Error fetching medications.', 'FETCH_MEDICATIONS_ERROR', error);
            }
        },
        getMedicationById: async (parent, { id }) => {
            try {
                return await MedicationsController.getMedicationById(id);
            } catch (error) {
                throw new ApolloError('Error fetching medication by ID.', 'FETCH_MEDICATION_BY_ID_ERROR', error);
            }
        },
    },
    Mutation: {
        createMedication: async (parent, { input }) => {
            try {
                return await MedicationsController.createMedication(input);
            } catch (error) {
                throw new ApolloError('Error creating medication.', 'CREATE_MEDICATION_ERROR', error);
            }
        },
        updateMedication: async (parent, { input }) => {
            try {
                return await MedicationsController.updateMedication(input);
            } catch (error) {
                throw new ApolloError('Error updating medication.', 'UPDATE_MEDICATION_ERROR', error);
            }
        },
        temporaryDeleteMedication: async (parent, { id }) => {
            try {
                return await MedicationsController.temporaryDeleteMedication(id);
            } catch (error) {
                throw new ApolloError('Error deleting medication.', 'TEMPORARY_DELETE_MEDICATION_ERROR', error);
            }
        },
        permanentDeleteMedication: async (parent, { id }) => {
            try {
                return await MedicationsController.permanentDeleteMedication(id);
            } catch (error) {
                throw new ApolloError('Error deleting medication.', 'PERMANENT_DELETE_MEDICATION_ERROR', error);
            }
        },
    },
};

module.exports = medicationsResolver;
