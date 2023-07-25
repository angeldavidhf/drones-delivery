const batteryLogController = require('../controllers/batteryLogController');

const auditLogResolver = {
    Query: {},
    Mutation: {
        createBatteryLog: async (_, { input }) => {
            try {
                const batteryLog = await batteryLogController.createBatteryLog(input);
                return batteryLog;
            } catch (error) {
                throw new Error('Error creating battery log: ' + error.message);
            }
        },
    },
};

module.exports = auditLogResolver;