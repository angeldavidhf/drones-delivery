const { ApolloError } = require('apollo-server-express');
const BatteryLogsController = require('../controllers/BatteryLogsController');

const batteryLogsResolver = {
    Query: {
        getAllBatteryLogs: async () => {
            try {
                const batteryLogs = await BatteryLogsController.getAllBatteryLogs();
                return batteryLogs;
            } catch (error) {
                throw new ApolloError(`Error fetching battery logs: ${error}`, 'FETCH_BATTERY_LOGS_ERROR');
            }
        },
        getBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                const batteryLogs = await BatteryLogsController.getBatteryLogsForDrone(droneId);
                return batteryLogs;
            } catch (error) {
                throw new ApolloError(`Error fetching battery logs for the drone: ${error}`, 'FETCH_BATTERY_LOGS_FOR_DRONE_ERROR', { droneId });
            }
        },
    },
    Mutation: {
        deleteBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                const result = await BatteryLogsController.deleteBatteryLogsForDrone(droneId);
                return result;
            } catch (error) {
                throw new ApolloError(`Error deleting battery logs for the drone: ${error}`, 'DELETE_BATTERY_LOGS_FOR_DRONE_ERROR', { droneId });
            }
        },
    },
};

module.exports = batteryLogsResolver;
