const { expect } = require('chai');
const sinon = require('sinon');
const { Drones } = require('../../src/models');
const DronesController = require('../../src/controllers/DronesController');

describe('Drones Controller', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should get all drones', async () => {
        const dronesData = [
            {
                serialNumber: 'DRN002',
                model: 'MiddleWeight',
                weightLimit: 200,
                battery: 80,
            },
            {
                serialNumber: 'DRN003',
                model: 'CruiserWeight',
                weightLimit: 300,
                battery: 70,
            },
        ];

        const findAllStub = sinon.stub(Drones, 'findAll').resolves(dronesData);

        const result = await DronesController.getAllDrones();

        expect(result).to.deep.equal(dronesData);
        expect(findAllStub.calledOnce).to.be.true;
    });

});
