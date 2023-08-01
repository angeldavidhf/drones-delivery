const { expect } = require('chai');
const sequelize = require('../../database/connection');
const Medications = require('../../src/models/Medications');

describe('Medications Model', () => {
    describe('Create Medication', () => {

        it('should not create a medication with invalid input', async () => {
            try {
                const invalidMedication = {
                    name: 'Medication-A',
                    weight: 10,
                };
                await Medications.create(invalidMedication);
            } catch (error) {
                expect(error.message).to.contain('notNull Violation: medications.code cannot be null');
            }
        });
    });
});
