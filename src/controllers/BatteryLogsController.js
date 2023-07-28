const { BatteryLogs, Drones } = require('../models');

const BatteryLogsController = {
    getAllBatteryLogs: async () => {
        try {
            const batteryLogs = await BatteryLogs.findAll();
            return batteryLogs;
        } catch (error) {
            throw new Error('Error fetching battery logs.');
        }
    },

    getBatteryLogsForDrone: async (droneId) => {
        try {
            const drone = await Drones.findByPk(droneId, {
                where: { flagDelete: false }
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            const batteryLogs = await BatteryLogs.findAll({
                where: { droneId },
            });

            return batteryLogs;
        } catch (error) {
            throw new Error('Error fetching battery logs for the drone.');
        }
    },

    createBatteryLog: async ({ droneId, batteryLevel }) => {
        try {
            const drone = await Drones.findByPk(droneId, {
                where: { flagDelete: false }
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            if (batteryLevel < 0 || batteryLevel > 100) {
                throw new Error('Invalid battery level. Battery level must be between 0 and 100.');
            }

            const newBatteryLog = await BatteryLogs.create({
                droneId,
                batteryLevel,
            });

            return newBatteryLog;
        } catch (error) {
            throw new Error('Error creating battery log entry.');
        }
    },

    updateBatteryLog: async ({ id, batteryLevel }) => {
        try {
            const batteryLog = await BatteryLogs.findByPk(id);
            if (!batteryLog) {
                throw new Error('Battery log entry not found.');
            }

            if (batteryLevel < 0 || batteryLevel > 100) {
                throw new Error('Invalid battery level. Battery level must be between 0 and 100.');
            }

            batteryLog.batteryLevel = batteryLevel;
            await batteryLog.save();

            return batteryLog;
        } catch (error) {
            throw new Error('Error updating battery log entry.');
        }
    },

    deleteBatteryLogsForDrone: async (droneId) => {
        try {
            const drone = await Drones.findByPk(droneId, {
                where: { flagDelete: false }
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            await BatteryLogs.destroy({
                where: { droneId },
            });

            return true;
        } catch (error) {
            throw new Error('Error deleting battery logs for the drone.');
        }
    },
};

module.exports = BatteryLogsController;