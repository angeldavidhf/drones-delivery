const { ApolloError } = require('apollo-server-express');
const MedicationsController = require('../controllers/MedicationsController');

const medicationsResolver = {
    Query: {
        getAllMedications: async () => {
            try {
                const medications = await MedicationsController.getAllMedications();
                return medications;
            } catch (error) {
                throw new ApolloError('Error fetching medications.', 'FETCH_MEDICATIONS_ERROR', error);
            }
        },
        getMedicationById: async (parent, { id }) => {
            try {
                const medication = await MedicationsController.getMedicationById(id);
                return medication;
            } catch (error) {
                throw new ApolloError('Error fetching medication by ID.', 'FETCH_MEDICATION_BY_ID_ERROR', error);
            }
        },
    },
    Mutation: {
        createMedication: async (parent, { name, weight, code }) => {
            try {
                const newMedication = await MedicationsController.createMedication({ name, weight, code });
                return newMedication;
            } catch (error) {
                throw new ApolloError('Error creating medication.', 'CREATE_MEDICATION_ERROR', error);
            }
        },
        updateMedication: async (parent, { id, name, weight, code }) => {
            try {
                const updatedMedication = await MedicationsController.updateMedication({ id, name, weight, code });
                return updatedMedication;
            } catch (error) {
                throw new ApolloError('Error updating medication.', 'UPDATE_MEDICATION_ERROR', error);
            }
        },
        temporaryDeleteMedication: async (parent, { id }) => {
            try {
                const result = await MedicationsController.temporaryDeleteMedication(id);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting medication.', 'TEMPORARY_DELETE_MEDICATION_ERROR', error);
            }
        },
        permanentDeleteMedication: async (parent, { id }) => {
            try {
                const result = await MedicationsController.permanentDeleteMedication(id);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting medication.', 'PERMANENT_DELETE_MEDICATION_ERROR', error);
            }
        },
    },
};

module.exports = medicationsResolver;
