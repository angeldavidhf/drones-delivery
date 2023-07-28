const { DronesMedications, Drones, Medications } = require('../models');

const DronesMedicationsController = {
    getAllDroneMedications: async () => {
        try {
            const droneMedications = await DronesMedications.findAll();
            return droneMedications;
        } catch (error) {
            throw new Error('Error fetching drone-medications entries.');
        }
    },

    getDroneMedicationById: async (id) => {
        try {
            const droneMedication = await DronesMedications.findByPk(id);
            if (!droneMedication) {
                throw new Error('Drone-medication entry not found.');
            }
            return droneMedication;
        } catch (error) {
            throw new Error('Error fetching drone-medication entry by ID.');
        }
    },

    createDroneMedication: async ({ droneId, medicationId, batteryUse, deliveryStatus }) => {
        try {
            const validDeliveryStatus = ['LOADED', 'DELIVERED'];
            if (!validDeliveryStatus.includes(deliveryStatus)) {
                throw new Error('Invalid delivery status.');
            }

            const drone = await Drones.findByPk(droneId, {
                where: { flagDelete: false }
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            const medication = await Medications.findByPk(medicationId, {
                where: { flagDelete: false }
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }

            const newDroneMedication = await DronesMedications.create({
                droneId,
                medicationId,
                batteryUse,
                deliveryStatus,
            });

            return newDroneMedication;
        } catch (error) {
            throw new Error('Error creating drone-medication entry.');
        }
    },

    updateDroneMedication: async ({ id, batteryUse, deliveryStatus }) => {
        try {
            const validDeliveryStatus = ['LOADED', 'DELIVERED'];
            if (!validDeliveryStatus.includes(deliveryStatus)) {
                throw new Error('Invalid delivery status.');
            }

            const droneMedication = await DronesMedications.findByPk(id);
            if (!droneMedication) {
                throw new Error('Drone-medication entry not found.');
            }

            droneMedication.batteryUse = batteryUse;
            droneMedication.deliveryStatus = deliveryStatus;
            await droneMedication.save();

            return droneMedication;
        } catch (error) {
            throw new Error('Error updating drone-medication entry.');
        }
    },

    deleteDroneMedication: async (id) => {
        try {
            const droneMedication = await DronesMedications.findByPk(id);
            if (!droneMedication) {
                throw new Error('Drone-medication entry not found.');
            }

            await droneMedication.destroy();

            return true;
        } catch (error) {
            throw new Error('Error deleting drone-medication entry.');
        }
    },
};

module.exports = DronesMedicationsController;