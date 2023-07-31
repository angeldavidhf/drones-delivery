const { DronesMedications, Drones, Medications, BatteryLogs} = require('../models');

const DronesMedicationsController = {
    getMedicationsForDrone: async (droneId) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: droneId,
                    flagDelete: false,
                },
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }

            return await DronesMedications.findAll({
                where: { droneId },
                include: [
                    {
                        model: Drones,
                        as: 'drone',
                    },
                    {
                        model: Medications,
                        as: 'medication',
                    }
                ]
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getDronesForMedication: async (medicationId) => {
        try {
            const drone = await Medications.findOne({
                where: {
                    id: medicationId,
                    flagDelete: false,
                },
            });
            if (!drone) {
                throw new Error('Medication not found.');
            }

            return await DronesMedications.findAll({
                where: { medicationId },
                include: [
                    {
                        model: Drones,
                        as: 'drone',
                    },
                    {
                        model: Medications,
                        as: 'medication',
                    }
                ]
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    loadMedicationsToDrone: async (droneId, medications) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: droneId,
                    flagDelete: false,
                },
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            if (drone.state !== 'LOADING') {
                throw new Error('Drone must be in LOADING state to load medications.');
            }

            const totalWeight = medications.reduce((acc, medication) => acc + medication.weight, 0);
            const batteryConsumption = totalWeight * 0.1;
            const newBatteryCapacity = drone.battery - batteryConsumption;

            if (totalWeight > drone.weightLimit) {
                throw new Error('Total weight of medications exceeds drone weight limit.');
            }

            if (newBatteryCapacity < 25) {
                throw new Error('Drone cannot be loaded if battery level is below 25%.');
            }

            for (const medication of medications) {


                await Medications.update({ droneId }, { where: { id: medication.id } });
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
            throw new Error(error.message);
        }
    },

    updateDroneMedication: async (input) => {
        try {
            const { id, batteryUse, deliveryStatus } = input;
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
            throw new Error(error.message);
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
            throw new Error(error.message);
        }
    },
};

module.exports = DronesMedicationsController;