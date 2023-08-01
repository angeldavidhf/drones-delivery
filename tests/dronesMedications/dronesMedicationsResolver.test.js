const { expect } = require('chai');
const sinon = require('sinon');
const DronesMedicationsController = require('../../src/controllers/DronesMedicationsController');
const dronesMedicationsResolver = require('../../src/resolvers/dronesMedicationsResolver');

describe('dronesMedicationsResolver', () => {
    describe('Query: getMedicationsForDrone', () => {
        it('should call DronesMedicationsController.getMedicationsForDrone', async () => {
            const droneId = 1;

            const getMedicationsForDroneStub = sinon.stub(DronesMedicationsController, 'getMedicationsForDrone');
            getMedicationsForDroneStub.withArgs(droneId).resolves([]);

            const result = await dronesMedicationsResolver.Query.getMedicationsForDrone(null, { droneId });

            expect(result).to.be.an('array').that.is.empty;
            expect(getMedicationsForDroneStub.calledOnceWith(droneId)).to.be.true;

            getMedicationsForDroneStub.restore();
        });
    });

    describe('Query: getDronesForMedication', () => {
        it('should call DronesMedicationsController.getDronesForMedication', async () => {
            const medicationId = 1;

            const getDronesForMedicationStub = sinon.stub(DronesMedicationsController, 'getDronesForMedication');
            getDronesForMedicationStub.withArgs(medicationId).resolves([]);

            const result = await dronesMedicationsResolver.Query.getDronesForMedication(null, { medicationId });

            expect(result).to.be.an('array').that.is.empty;
            expect(getDronesForMedicationStub.calledOnceWith(medicationId)).to.be.true;

            getDronesForMedicationStub.restore();
        });
    });

    describe('Mutation: loadMedicationsToDrone', () => {
        it('should call DronesMedicationsController.loadMedicationsToDrone', async () => {
            const droneId = 1;
            const medications = [1, 2, 3];

            const loadMedicationsToDroneStub = sinon.stub(DronesMedicationsController, 'loadMedicationsToDrone');
            loadMedicationsToDroneStub.withArgs(droneId, medications).resolves([]);

            const result = await dronesMedicationsResolver.Mutation.loadMedicationsToDrone(null, { droneId, medications });

            expect(result).to.be.an('array').that.is.empty;
            expect(loadMedicationsToDroneStub.calledOnceWith(droneId, medications)).to.be.true;

            loadMedicationsToDroneStub.restore();
        });
   });
});
