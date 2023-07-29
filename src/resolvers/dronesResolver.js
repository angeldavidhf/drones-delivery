const { ApolloError } = require('apollo-server-express');
const DronesController = require('../controllers/DronesController');

const dronesResolver = {
    Query: {
        getAllDrones: async () => {
            try {
                const drones = await DronesController.getAllDrones();
                return drones;
            } catch (error) {
                throw new ApolloError(`Error fetching drones: ${error}`, 'FETCH_DRONES_ERROR');
            }
        },
        getDroneById: async (parent, { id }) => {
            try {
                const drone = await DronesController.getDroneById(id);
                return drone;
            } catch (error) {
                throw new ApolloError(`Error fetching drone by ID: ${error}`, 'FETCH_DRONE_BY_ID_ERROR', { id });
            }
        },
    },
    Mutation: {
        createDrone: async (parent, { input }) => {
            try {
                const newDrone = await DronesController.createDrone(input);
                return newDrone;
            } catch (error) {
                throw new ApolloError(`Error creating drone: ${error}`, 'CREATE_DRONE_ERROR', { input });
            }
        },
        updateDrone: async (parent, { input }) => {
            try {
                const updatedDrone = await DronesController.updateDrone(input);
                return updatedDrone;
            } catch (error) {
                throw new ApolloError(`Error updating drone: ${error}`, 'UPDATE_DRONE_ERROR', { input });
            }
        },
        temporaryDeleteDrone: async (parent, { id }) => {
            try {
                const result = await DronesController.temporaryDeleteDrone(id);
                return result;
            } catch (error) {
                throw new ApolloError(`Error deleting drone: ${error}`, 'TEMPORARY_DELETE_DRONE_ERROR', { id });
            }
        },
        permanentDeleteDrone: async (parent, { id }) => {
            try {
                const result = await DronesController.permanentDeleteDrone(id);
                return result;
            } catch (error) {
                throw new ApolloError(`Error deleting drone: ${error}`, 'PERMANENT_DELETE_DRONE_ERROR', { id });
            }
        },
    },
};

module.exports = dronesResolver;
