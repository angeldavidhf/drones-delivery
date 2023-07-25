const { AuditLogs } = require('../models');

const createAuditLog = async (data) => {
    try {
        const auditLog = await AuditLogs.create(data);
        return auditLog;
    } catch (error) {
        throw new Error('Error creating audit log.');
    }
};

module.exports = {
    createAuditLog,
};