const { ApolloError } = require('apollo-server-express');
const BatteryLogsController = require('../controllers/BatteryLogsController');

const batteryLogsResolver = {
    Query: {
        getAllBatteryLogs: async () => {
            try {
                const batteryLogs = await BatteryLogsController.getAllBatteryLogs();
                return batteryLogs;
            } catch (error) {
                throw new ApolloError('Error fetching battery logs.', 'FETCH_BATTERY_LOGS_ERROR', error);
            }
        },
        getBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                const batteryLogs = await BatteryLogsController.getBatteryLogsForDrone(droneId);
                return batteryLogs;
            } catch (error) {
                throw new ApolloError('Error fetching battery logs for the drone.', 'FETCH_BATTERY_LOGS_FOR_DRONE_ERROR', error);
            }
        },
    },
    Mutation: {
        createBatteryLog: async (parent, { droneId, batteryLevel }) => {
            try {
                const newBatteryLog = await BatteryLogsController.createBatteryLog({ droneId, batteryLevel });
                return newBatteryLog;
            } catch (error) {
                throw new ApolloError('Error creating battery log entry.', 'CREATE_BATTERY_LOG_ERROR', error);
            }
        },
        updateBatteryLog: async (parent, { id, batteryLevel }) => {
            try {
                const updatedBatteryLog = await BatteryLogsController.updateBatteryLog({ id, batteryLevel });
                return updatedBatteryLog;
            } catch (error) {
                throw new ApolloError('Error updating battery log entry.', 'UPDATE_BATTERY_LOG_ERROR', error);
            }
        },
        deleteBatteryLogsForDrone: async (parent, { droneId }) => {
            try {
                const result = await BatteryLogsController.deleteBatteryLogsForDrone(droneId);
                return result;
            } catch (error) {
                throw new ApolloError('Error deleting battery logs for the drone.', 'DELETE_BATTERY_LOGS_FOR_DRONE_ERROR', error);
            }
        },
    },
};

module.exports = batteryLogsResolver;
