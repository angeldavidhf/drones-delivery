const Drones = require('./Drones');
const Medications = require('./Medications');
const DronesMedications = require('./DronesMedications');
const BatteryLogs = require('./BatteryLogs');

Drones.associate({ BatteryLogs, DronesMedications });
Medications.associate({ DronesMedications });

module.exports = { Drones, Medications, DronesMedications, BatteryLogs };