const { expect } = require('chai');
const sinon = require('sinon');
const MedicationsController = require('../../src/controllers/MedicationsController');
const medicationsResolver = require('../../src/resolvers/medicationsResolver');

describe('Medications Resolver', () => {
    describe('Query.getAllMedications', () => {
        it('should return all medications', async () => {
            const getAllMedicationsStub = sinon.stub(MedicationsController, 'getAllMedications').returns([]);

            const result = await medicationsResolver.Query.getAllMedications();

            expect(result).to.be.an('array').that.is.empty;
            expect(getAllMedicationsStub.calledOnce).to.be.true;

            getAllMedicationsStub.restore();
        });
    });

    describe('Query.getMedicationById', () => {
        it('should return a specific medication by ID', async () => {
            const getMedicationByIdStub = sinon.stub(MedicationsController, 'getMedicationById').returns({ id: 1, name: 'Medication-A', weight: 10, code: 'MED001' });

            const dummyMedicationId = 1;
            const result = await medicationsResolver.Query.getMedicationById({}, { id: dummyMedicationId });

            expect(result).to.deep.equal({ id: 1, name: 'Medication-A', weight: 10, code: 'MED001' });
            expect(getMedicationByIdStub.calledOnce).to.be.true;
            expect(getMedicationByIdStub.firstCall.args[0]).to.equal(dummyMedicationId);

            getMedicationByIdStub.restore();
        });
    });

    describe('Mutation.createMedication', () => {
        it('should create a new medication', async () => {
            const createMedicationStub = sinon.stub(MedicationsController, 'createMedication').returns({ id: 1, name: 'Medication-A', weight: 10, code: 'MED001' });

            const dummyInput = { name: 'Medication-A', weight: 10, code: 'MED001' };
            const result = await medicationsResolver.Mutation.createMedication({}, { input: dummyInput });

            expect(result).to.deep.equal({ id: 1, name: 'Medication-A', weight: 10, code: 'MED001' });
            expect(createMedicationStub.calledOnce).to.be.true;
            expect(createMedicationStub.firstCall.args[0]).to.deep.equal(dummyInput);

            createMedicationStub.restore();
        });
    });
});
