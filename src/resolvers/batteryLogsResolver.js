const { ApolloError } = require('apollo-server-express');
const BatteryLogsController = require('../controllers/BatteryLogsController');

const batteryLogsResolver = {
    Query: {
        getAllBatteryLogs: async () => {
            try {
                return await BatteryLogsController.getAllBatteryLogs();
            } catch (error) {
                throw new ApolloError(`Error fetching battery logs: ${error}`, 'FETCH_BATTERY_LOGS_ERROR');
            }
        },
        getBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                return await BatteryLogsController.getBatteryLogsForDrone(droneId);
            } catch (error) {
                throw new ApolloError(`Error fetching battery logs for the drone: ${error}`, 'FETCH_BATTERY_LOGS_FOR_DRONE_ERROR', { droneId });
            }
        },
    },
    Mutation: {
        deleteBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                return await BatteryLogsController.deleteBatteryLogsForDrone(droneId);
            } catch (error) {
                throw new ApolloError(`Error deleting battery logs for the drone: ${error}`, 'DELETE_BATTERY_LOGS_FOR_DRONE_ERROR', { droneId });
            }
        },
    },
};

module.exports = batteryLogsResolver;
