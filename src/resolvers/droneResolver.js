const droneController = require('../controllers/droneController');

const droneResolver = {
    Query: {
        drones: async () => {
            try {
                const drones = await droneController.getAllDrones();
                return drones;
            } catch (error) {
                throw new Error('Error fetching drones: ' + error.message);
            }
        },
        drone: async (_, { id }) => {
            try {
                const drone = await droneController.getDroneById(id);
                return drone;
            } catch (error) {
                throw new Error('Error fetching drone: ' + error.message);
            }
        },
    },
    Mutation: {
        createDrone: async (_, { input }) => {
            try {
                const drone = await droneController.createDrone(input);
                return drone;
            } catch (error) {
                throw new Error('Error creating drone: ' + error.message);
            }
        },
        updateDrone: async (_, { id, input }) => {
            try {
                const drone = await droneController.getDroneById(id);
                if (!drone) {
                    throw new Error('Drone not found');
                }
                await droneController.updateDrone(id, input);
                return drone;
            } catch (error) {
                throw new Error('Error updating drone: ' + error.message);
            }
        },
        deleteDrone: async (_, { id }) => {
            try {
                const drone = await droneController.getDroneById(id);
                if (!drone) {
                    throw new Error('Drone not found');
                }
                await droneController.deleteDrone(id);
                return true;
            } catch (error) {
                throw new Error('Error deleting drone: ' + error.message);
            }
        },
        loadMedicationsToDrone: async (_, { droneId, medications }) => {
            try {
                const success = await droneController.loadMedicationsToDrone(droneId, medications);
                return success;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    Drone: {
        medications: async (drone) => {
            try {
                const medications = await droneController.getMedicationsForDrone(drone.id);
                return medications;
            } catch (error) {
                throw new Error('Error fetching medications for drone: ' + error.message);
            }
        },
        auditLogs: async (drone) => {
            try {
                const auditLogs = await droneController.getAuditLogsForDrone(drone.id);
                return auditLogs;
            } catch (error) {
                throw new Error('Error fetching audit logs for drone: ' + error.message);
            }
        },
        batteryLogs: async (drone) => {
            try {
                const batteryLogs = await droneController.getBatteryLogsForDrone(drone.id);
                return batteryLogs;
            } catch (error) {
                throw new Error('Error fetching battery logs for drone: ' + error.message);
            }
        },
    },
};

module.exports = droneResolver;