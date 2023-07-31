const { Medications, BatteryLogs, DronesMedications, Drones} = require('../models');

const MedicationsController = {
    getAllMedications: async () => {
        try {
            return await Medications.findAll({
                include: {
                    model: DronesMedications,
                    as: 'drones_medications',
                    include: [
                        { model: Drones, as: 'drone' }
                    ]
                },
                where: { flagDelete: false }
            });
        } catch (error) {
            throw new Error('Error fetching medications.');
        }
    },

    getMedicationById: async (id) => {
        try {
            const medication = await Medications.findOne({
                include: {
                    model: DronesMedications,
                    as: 'drones_medications',
                    include: [
                        { model: Drones, as: 'drone' }
                    ]
                },
                where: {
                    id: id,
                    flagDelete: false,
                },
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }
            return medication;
        } catch (error) {
            throw new Error('Error fetching medication by ID.');
        }
    },

    createMedication: async (input) => {
        try {
            const { name, weight, code } = input;
            const codeRegex = /^[A-Z0-9_-]+$/;
            if (!codeRegex.test(code)) {
                throw new Error('Invalid medication code. Code must contain only upper case letters, underscores, and numbers.');
            }
            return await Medications.create({
                name,
                weight,
                code,
                flagDelete: false,
            });
        } catch (error) {
            throw new Error('Error creating medication.');
        }
    },

    updateMedication: async (input) => {
        try {
            const { id, name, weight, code } = input;
            const codeRegex = /^[A-Z0-9_-]+$/;
            if (!codeRegex.test(code)) {
                throw new Error('Invalid medication code. Code must contain only upper case letters, underscores, and numbers.');
            }

            const medication = await Medications.findByPk(id, {
                where: { flagDelete: false }
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }

            medication.name = name;
            medication.weight = weight;
            medication.code = code;
            await medication.save();

            return medication;
        } catch (error) {
            throw new Error('Error updating medication.');
        }
    },

    temporaryDeleteMedication: async (id) => {
        try {
            const medication = await Medications.findByPk(id, {
                where: { flagDelete: false }
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }

            medication.flagDelete = true;

            await medication.save();

            return true;
        } catch (error) {
            throw new Error('Error deleting medication.');
        }
    },

    permanentDeleteMedication: async (id) => {
        try {
            const medication = await Medications.findByPk(id, {
                where: { flagDelete: false }
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }

            await medication.destroy();

            return true;
        } catch (error) {
            throw new Error('Error deleting medication.');
        }
    },
};

module.exports = MedicationsController;