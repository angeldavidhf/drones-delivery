const Drones = require('./drones');
const Medications = require('./medications');
const AuditLogs = require('./auditLogs');
const BatteryLogs = require('./batteryLogs');

Medications.associate({ Drones });

module.exports = { Drones, Medications, AuditLogs, BatteryLogs };