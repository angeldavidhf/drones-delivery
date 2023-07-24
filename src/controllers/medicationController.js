const { Medications, Drones } = require('../models');

const createMedication = async (data) => {
    try {
        const medication = await Medications.create(data);
        return medication;
    } catch (error) {
        throw new Error('Error creating medication.');
    }
};

const updateMedication = async (id, data) => {
    try {
        const medication = await Medications.findByPk(id);
        if (!medication) {
            throw new Error(`Medication with ID ${id} not found.`);
        }

        await medication.update(data);
        return medication;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteMedication = async (id) => {
    try {
        const deleted = await Medications.destroy({
            where: { id },
        });
        return deleted === 1; // Return true if one row was deleted
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllMedications = async () => {
    try {
        const medications = await Medications.findAll();
        return medications;
    } catch (error) {
        throw new Error('Error fetching medications.');
    }
};

const getMedicationById = async (id) => {
    try {
        const medication = await Medications.findByPk(id);
        if (!medication) {
            throw new Error(`Medication with ID ${id} not found.`);
        }
        return medication;
    } catch (error) {
        throw new Error('Error fetching medication with ID ' + id);
    }
};

const getDroneForMedication = async (medicationId) => {
    try {
        const medication = await Medications.findByPk(medicationId);
        if (!medication) {
            throw new Error(`Medication with ID ${medicationId} not found.`);
        }

        const drone = await Drones.findByPk(medication.droneId);
        return drone;
    } catch (error) {
        throw new Error('Error fetching drone for medication: ' + error.message);
    }
};

module.exports = {
    createMedication,
    updateMedication,
    deleteMedication,
    getAllMedications,
    getMedicationById,
    getDroneForMedication,
};