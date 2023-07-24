const { Medication } = require('../models');

const medicationResolvers = {
    Query: {
        medications: () => Medication.findAll(),
        medication: (_, { id }) => Medication.findByPk(id),
    },
    Mutation: {
        createMedication: (_, { input }) => Medication.create(input),
        updateMedication: async (_, { id, input }) => {
            const medication = await Medication.findByPk(id);
            if (!medication) {
                throw new Error(`Medication with ID ${id} not found.`);
            }
            return medication.update(input);
        },
        deleteMedication: async (_, { id }) => {
            const medication = await Medication.findByPk(id);
            if (!medication) {
                throw new Error(`Medication with ID ${id} not found.`);
            }
            await medication.destroy();
            return true;
        },
    },
};

module.exports = medicationResolvers;