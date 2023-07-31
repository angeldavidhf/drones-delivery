const { ApolloError } = require('apollo-server-express');
const DronesController = require('../controllers/DronesController');

const dronesResolver = {
    Query: {
        getAllDrones: async () => {
            try {
                return await DronesController.getAllDrones();
            } catch (error) {
                throw new ApolloError(`Error fetching drones: ${error}`, 'FETCH_DRONES_ERROR');
            }
        },
        getDroneById: async (parent, { id }) => {
            try {
                return await DronesController.getDroneById(id);
            } catch (error) {
                throw new ApolloError(`Error fetching drone by ID: ${error}`, 'FETCH_DRONE_BY_ID_ERROR', { id });
            }
        },
        getDronesByState: async (parent, { state }) => {
            try {
                return await DronesController.getDronesByState(state);
            } catch (error) {
                throw new ApolloError(`Error fetching drone by state: ${error}`, 'FETCH_DRONE_BY_STATE_ERROR', { id });
            }
        },

    },
    Mutation: {
        createDrone: async (parent, { input }) => {
            try {
                return await DronesController.createDrone(input);
            } catch (error) {
                throw new ApolloError(`Error creating drone: ${error}`, 'CREATE_DRONE_ERROR', { input });
            }
        },
        updateDrone: async (parent, { input }) => {
            try {
                return await DronesController.updateDrone(input);
            } catch (error) {
                throw new ApolloError(`Error updating drone: ${error}`, 'UPDATE_DRONE_ERROR', { input });
            }
        },
        changeStateDrone: async (parent, { id }) => {
            try {
                return await DronesController.changeStateDrone(id);
            } catch (error) {
                throw new ApolloError(`Error deleting drone: ${error}`, 'TEMPORARY_DELETE_DRONE_ERROR', { id });
            }
        },
        temporaryDeleteDrone: async (parent, { id }) => {
            try {
                return await DronesController.temporaryDeleteDrone(id);
            } catch (error) {
                throw new ApolloError(`Error deleting drone: ${error}`, 'TEMPORARY_DELETE_DRONE_ERROR', { id });
            }
        },
        permanentDeleteDrone: async (parent, { id }) => {
            try {
                return await DronesController.permanentDeleteDrone(id);
            } catch (error) {
                throw new ApolloError(`Error deleting drone: ${error}`, 'PERMANENT_DELETE_DRONE_ERROR', { id });
            }
        },
    },
};

module.exports = dronesResolver;
