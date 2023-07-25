const auditLogController = require('../controllers/auditLogController');

const auditLogResolver = {
    Query: {},
    Mutation: {
        createAuditLog: async (_, { input }) => {
            try {
                const auditLog = await auditLogController.createAuditLog(input);
                return auditLog;
            } catch (error) {
                throw new Error('Error creating audit log: ' + error.message);
            }
        },
    },
};

module.exports = auditLogResolver;