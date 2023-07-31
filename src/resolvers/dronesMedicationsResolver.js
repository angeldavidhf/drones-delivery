const { ApolloError } = require('apollo-server-express');
const DronesMedicationsController = require('../controllers/DronesMedicationsController');

const dronesMedicationsResolver = {
    Query: {
        getMedicationsForDrone: async (parent, { droneId }) => {
            try {
                return await DronesMedicationsController.getMedicationsForDrone(droneId);
            } catch (error) {
                throw new ApolloError(`Error fetching medications for drone entry by ID: ${error}`, 'FETCH_DRONE_MEDICATIONS_BY_ID_ERROR', { droneId });
            }
        },
        getDronesForMedication: async (parent, { medicationId }) => {
            try {
                return await DronesMedicationsController.getDronesForMedication(medicationId);
            } catch (error) {
                throw new ApolloError(`Error fetching drones form medication entry by ID: ${error}`, 'FETCH_DRONES_MEDICATION_BY_ID_ERROR', { medicationId });
            }
        },
    },
    Mutation: {
        loadMedicationsToDrone: async (parent, { droneId, medications }) => {
            try {
                return await DronesMedicationsController.loadMedicationsToDrone(droneId, medications);
            } catch (error) {
                throw new ApolloError(`Error loading medications in drone: ${error}`, 'LOADING_MEDICATIONS_BY_DRONE_ERROR', { droneId, medications });
            }
        },
    },
};

module.exports = dronesMedicationsResolver;
