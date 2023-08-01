const { ApolloError } = require('apollo-server-express');
const { expect } = require('chai');
const sinon = require('sinon');
const medicationsResolver = require('../../src/resolvers/medicationsResolver');
const MedicationsController = require('../../src/controllers/MedicationsController');

describe('medicationsResolver', () => {
    describe('Query: getAllMedications', () => {
        it('should call MedicationsController.getAllMedications and return medications', async () => {
            const mockMedications = [
                { id: 1, name: 'Medication-A', weight: 10, code: 'MED001' },
                { id: 2, name: 'Medication-B', weight: 20, code: 'MED002' },
            ];

            const getAllMedicationsStub = sinon.stub(MedicationsController, 'getAllMedications').resolves(mockMedications);

            const result = await medicationsResolver.Query.getAllMedications();

            expect(getAllMedicationsStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockMedications);

            getAllMedicationsStub.restore();
        });
    });

    describe('Query: getMedicationById', () => {
        it('should call MedicationsController.getMedicationById and return the medication', async () => {
            const mockMedication = { id: 1, name: 'Medication-A', weight: 10, code: 'MED001' };
            const id = 1;

            const getMedicationByIdStub = sinon.stub(MedicationsController, 'getMedicationById').resolves(mockMedication);

            const result = await medicationsResolver.Query.getMedicationById(null, { id });

            expect(getMedicationByIdStub.calledOnceWithExactly(id)).to.be.true;
            expect(result).to.deep.equal(mockMedication);

            getMedicationByIdStub.restore();
        });

        it('should return null if MedicationsController.getMedicationById returns null', async () => {
            const id = 1;

            const getMedicationByIdStub = sinon.stub(MedicationsController, 'getMedicationById').resolves(null);

            const result = await medicationsResolver.Query.getMedicationById(null, { id });

            expect(getMedicationByIdStub.calledOnceWithExactly(id)).to.be.true;
            expect(result).to.be.null;

            getMedicationByIdStub.restore();
        });
    });
});
