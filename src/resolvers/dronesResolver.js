const { ApolloError } = require('apollo-server-express');
const DronesController = require('../controllers/DronesController');

const dronesResolver = {
    Query: {
        getAllDrones: async () => {
            try {
                const drones = await DronesController.getAllDrones();
                return drones;
            } catch (error) {
                throw new ApolloError('Error fetching drones.', 'FETCH_DRONES_ERROR', error);
            }
        },
        getDroneById: async (parent, { id }) => {
            try {
                const drone = await DronesController.getDroneById(id);
                return drone;
            } catch (error) {
                throw new ApolloError('Error fetching drone by ID.', 'FETCH_DRONE_BY_ID_ERROR', error);
            }
        },
    },
    Mutation: {
        createDrone: async (parent, { input }) => {
            try {
                const newDrone = await DronesController.createDrone(input);
                return newDrone;
            } catch (error) {
                throw new ApolloError('Error creating drone.', 'CREATE_DRONE_ERROR', error);
            }
        },
        updateDrone: async (parent, { id, model, weightLimit, battery }) => {
            try {
                const updatedDrone = await DronesController.updateDrone({ id, model, weightLimit, battery });
                return updatedDrone;
            } catch (error) {
                throw new ApolloError('Error updating drone.', 'UPDATE_DRONE_ERROR', error);
            }
        },
        temporaryDeleteDrone: async (parent, { id }) => {
            try {
                const result = await DronesController.temporaryDeleteDrone(id);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting drone.', 'TEMPORARY_DELETE_DRONE_ERROR', error);
            }
        },
        permanentDeleteDrone: async (parent, { id }) => {
            try {
                const result = await DronesController.permanentDeleteDrone(id);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting drone.', 'PERMANENT_DELETE_DRONE_ERROR', error);
            }
        },
    },
};

module.exports = dronesResolver;
