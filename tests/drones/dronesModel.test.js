const { expect } = require('chai');
const { Drones } = require('../../src/models');

describe('Drones Model', () => {
    describe('should create a new drone', () => {
        it('should create a new drone', async () => {
            try {

                const newDrone = Drones.build({
                    serialNumber: 'DRN001',
                    model: 'LightWeight',
                    weightLimit: 100,
                    battery: 100,
                });

                await newDrone.save();

                const createdDrone = await Drones.findOne({
                    where: { id: newDrone.id },
                });

                expect(createdDrone.serialNumber).to.equal('DRN001');
                expect(createdDrone.model).to.equal('LightWeight');
                expect(createdDrone.weightLimit).to.equal(100);
                expect(createdDrone.battery).to.equal(100);
            } catch (error) {
                expect.fail('An error occurred during the test');
            }
        });
    });
});