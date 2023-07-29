const { ApolloError } = require('apollo-server-express');
const DronesMedicationsController = require('../controllers/DronesMedicationsController');

const dronesMedicationsResolver = {
    Query: {
        getAllDroneMedications: async () => {
            try {
                const droneMedications = await DronesMedicationsController.getAllDroneMedications();
                return droneMedications;
            } catch (error) {
                throw new ApolloError('Error fetching drone-medications entries.', 'FETCH_DRONE_MEDICATIONS_ERROR', error);
            }
        },
        getDroneMedicationById: async (parent, { id }) => {
            try {
                const droneMedication = await DronesMedicationsController.getDroneMedicationById(id);
                return droneMedication;
            } catch (error) {
                throw new ApolloError('Error fetching drone-medication entry by ID.', 'FETCH_DRONE_MEDICATION_BY_ID_ERROR', error);
            }
        },
    },
    Mutation: {
        createDroneMedication: async (parent, { input }) => {
            try {
                const newDroneMedication = await DronesMedicationsController.createDroneMedication(input);
                return newDroneMedication;
            } catch (error) {
                throw new ApolloError('Error creating drone-medication entry.', 'CREATE_DRONE_MEDICATION_ERROR', error);
            }
        },
        updateDroneMedication: async (parent, { input }) => {
            try {
                const updatedDroneMedication = await DronesMedicationsController.updateDroneMedication(input);
                return updatedDroneMedication;
            } catch (error) {
                throw new ApolloError('Error updating drone-medication entry.', 'UPDATE_DRONE_MEDICATION_ERROR', error);
            }
        },
        deleteDroneMedication: async (parent, { id }) => {
            try {
                const result = await DronesMedicationsController.deleteDroneMedication(id);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting drone-medication entry.', 'DELETE_DRONE_MEDICATION_ERROR', error);
            }
        },
    },
};

module.exports = dronesMedicationsResolver;
