const cron = require('node-cron');
const { Drones, AuditLogs, BatteryLogs, Medications } = require('../models');

const createDrone = async (data) => {
    try {
        const drone = await Drones.create(data);
        return drone;
    } catch (error) {
        throw new Error('Error creating drone.');
    }
};

const getAllDrones = async () => {
    try {
        const drones = await Drones.findAll();
        return drones;
    } catch (error) {
        throw new Error('Error fetching drones.');
    }
};

const getDroneById = async (id) => {
    try {
        const drone = await Drones.findByPk(id, {
            include: {
                model: Medications,
                as: 'medications',
            },
        });
        if (!drone) {
            throw new Error(`Drone with ID ${id} not found.`);
        }
        return drone;
    } catch (error) {
        throw new Error('Error fetching drone with ID ' + id);
    }
};

const updateDrone = async (id, data) => {
    try {
        const drone = await Drones.findByPk(id);
        if (!drone) {
            throw new Error(`Drone with ID ${id} not found.`);
        }
        await drone.update(data);
        return drone;
    } catch (error) {
        throw new Error('Error updating drone: ' + error.message);
    }
};

const deleteDrone = async (id) => {
    try {
        const deleted = await Drones.destroy({
            where: { id },
        });
        return deleted === 1; // Return true if one row was deleted
    } catch (error) {
        throw new Error(`Error deleting drone with ID ${id}.`);
    }
};

const loadMedicationsToDrone = async (droneId, medications) => {
    try {
        const drone = await Drones.findByPk(droneId);
        if (!drone) {
            throw new Error(`Drone with ID ${droneId} not found.`);
        }

        const totalWeight = medications.reduce((acc, medication) => acc + medication.weight, 0);

        if (totalWeight > drone.weightLimit) {
            throw new Error('Total weight of medications exceeds drone weight limit.');
        }

        if (drone.state !== 'LOADING') {
            throw new Error('Drone must be in LOADING state to load medications.');
        }

        if (drone.batteryCapacity < 25) {
            throw new Error('Drone cannot be loaded if battery level is below 25%.');
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        drone.state = 'LOADED';

        const batteryConsumption = totalWeight * 0.1;
        drone.batteryCapacity -= batteryConsumption;

        const auditLog = await AuditLogs.create({
            droneId: drone.id,
            medications: medications.map((medication) => medication.name),
        });

        await drone.save();

        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};

const checkDroneBattery = async (droneId) => {
    try {
        const drone = await Drones.findByPk(droneId);
        if (!drone) {
            throw new Error(`Drone with ID ${droneId} not found.`);
        }

        const currentBatteryLevel = drone.batteryCapacity;

        await BatteryLogs.create({
            droneId: drone.id,
            batteryLevel: currentBatteryLevel,
        });

        return currentBatteryLevel;
    } catch (error) {
        throw new Error(error.message);
    }
};

const initBatteryCheckTask = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            const drones = await Drones.findAll();

            for (const drone of drones) {
                const currentBatteryLevel = drone.batteryCapacity;
                await BatteryLogs.create({
                    droneId: drone.id,
                    batteryLevel: currentBatteryLevel,
                });
            }

            console.log('Battery check task executed successfully.');
        } catch (error) {
            console.error('Error executing battery check task:', error.message);
        }
    });
};

const getMedicationsForDrone = async (droneId) => {
    try {
        const medications = await Medications.findAll({ where: { droneId } });
        return medications;
    } catch (error) {
        throw new Error(`Error fetching medications for drone with ID ${droneId}.`);
    }
};

const getAuditLogsForDrone = async (droneId) => {
    try {
        const auditLogs = await AuditLogs.findAll({ where: { droneId } });
        return auditLogs;
    } catch (error) {
        throw new Error(`Error fetching audit logs for drone with ID ${droneId}.`);
    }
};

const getBatteryLogsForDrone = async (droneId) => {
    try {
        const batteryLogs = await BatteryLogs.findAll({ where: { droneId } });
        return batteryLogs;
    } catch (error) {
        throw new Error(`Error fetching battery logs for drone with ID ${droneId}.`);
    }
};

module.exports = {
    createDrone,
    getAllDrones,
    getDroneById,
    updateDrone,
    deleteDrone,
    loadMedicationsToDrone,
    checkDroneBattery,
    initBatteryCheckTask,
    getMedicationsForDrone,
    getAuditLogsForDrone,
    getBatteryLogsForDrone,
};