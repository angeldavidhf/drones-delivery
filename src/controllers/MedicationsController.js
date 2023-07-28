const { Medications } = require('../models');

const MedicationsController = {
    getAllMedications: async () => {
        try {
            const medications = await Medications.findAll({
                include: 'drones_medications',
                where: { flagDelete: false }
            });
            return medications;
        } catch (error) {
            throw new Error('Error fetching medications.');
        }
    },

    getMedicationById: async (id) => {
        try {
            const medication = await Medications.findByPk(id, {
                include: 'drones_medications',
                where: { flagDelete: false }
            });
            if (!medication) {
                throw new Error('Medication not found.');
            }
            return medication;
        } catch (error) {
            throw new Error('Error fetching medication by ID.');
        }
    },

    createMedication: async ({ name, weight, code }) => {
        try {
            const codeRegex = /^[A-Z0-9_]+$/;
            if (!codeRegex.test(code)) {
                throw new Error('Invalid medication code. Code must contain only upper case letters, underscores, and numbers.');
            }

            const newMedication = await Medications.create({
                name,
                weight,
                code,
                flagDrop: false,
            });

            return newMedication;
        } catch (error) {
            throw new Error('Error creating medication.');
        }
    },

    updateMedication: async ({ id, name, weight, code }) => {
        try {
            const codeRegex = /^[A-Z0-9_]+$/;
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