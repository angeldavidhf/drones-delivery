const medicationController = require('../controllers/medicationController');

const medicationResolver = {
    Query: {
        medications: async () => {
            try {
                const medications = await medicationController.getAllMedications();
                return medications;
            } catch (error) {
                throw new Error('Error fetching medications: ' + error.message);
            }
        },
        medication: async (_, { id }) => {
            try {
                const medication = await medicationController.getMedicationById(id);
                if (!medication) {
                    throw new Error('Medication not found');
                }
                return medication;
            } catch (error) {
                throw new Error('Error fetching medication: ' + error.message);
            }
        },
    },
    Mutation: {
        createMedication: async (_, { input }) => {
            try {
                const medication = await medicationController.createMedication(input);
                return medication;
            } catch (error) {
                throw new Error('Error creating medication: ' + error.message);
            }
        },
        updateMedication: async (_, { id, input }) => {
            try {
                const medication = await medicationController.updateMedication(id, input);
                return medication;
            } catch (error) {
                throw new Error('Error updating medication: ' + error.message);
            }
        },
        deleteMedication: async (_, { id }) => {
            try {
                const result = await medicationController.deleteMedication(id);
                return result;
            } catch (error) {
                throw new Error('Error deleting medication: ' + error.message);
            }
        },
    },
    Medication: {
        drone: async (medication) => {
            try {
                const drone = await medicationController.getDroneForMedication(medication.id);
                return drone;
            } catch (error) {
                throw new Error('Error fetching drone for medication: ' + error.message);
            }
        },
    },
};

module.exports = medicationResolver;