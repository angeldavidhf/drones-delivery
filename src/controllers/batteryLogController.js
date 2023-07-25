const { BatteryLogs } = require('../models');

const createBatteryLog = async (data) => {
    try {
        const batteryLog = await BatteryLogs.create(data);
        return batteryLog;
    } catch (error) {
        throw new Error('Error creating battery log.');
    }
};

module.exports = {
    createBatteryLog,
};