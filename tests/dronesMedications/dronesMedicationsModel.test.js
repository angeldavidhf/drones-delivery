const { expect } = require('chai');
const sinon = require('sinon');
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const DronesMedications = require('../../src/models/DronesMedications');
const Drones = require('../../src/models/Drones');
const Medications = require('../../src/models/Medications');

describe('DronesMedications Model', () => {
    before(() => {
        sequelize.options.dialectOptions = { inMemory: true };
    });

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    after(() => {
        sequelize.close();
    });

    it('should create a DronesMedications record', async () => {
        const drone = await Drones.create({
            serialNumber: 'DRN001',
            model: 'LightWeight',
            weightLimit: 100,
            battery: 80,
        });

        const medication = await Medications.create({
            name: 'Medication-A',
            weight: 50,
            code: 'MED001',
        });

        const droneMedicationData = {
            droneId: drone.id,
            medicationId: medication.id,
            batteryUse: 20,
            deliveryStatus: 'LOADED',
        };

        const droneMedication = await DronesMedications.create(droneMedicationData);

        expect(droneMedication.id).to.be.a('number');
        expect(droneMedication.droneId).to.equal(drone.id);
        expect(droneMedication.medicationId).to.equal(medication.id);
        expect(droneMedication.batteryUse).to.equal(droneMedicationData.batteryUse);
        expect(droneMedication.deliveryStatus).to.equal(droneMedicationData.deliveryStatus);
    });

    it('should not create a DronesMedications record without required fields', async () => {
        try {
            await DronesMedications.create({});
        } catch (error) {
            expect(error.message).to.include('cannot be null');
        }
    });
});
