const { expect } = require('chai');
const sinon = require('sinon');
const BatteryLogsController = require('../../src/controllers/BatteryLogsController');
const BatteryLogs = require('../../src/models/BatteryLogs');

describe('BatteryLogs Controller', () => {
    describe('getAllBatteryLogs', () => {
        it('should return all battery logs', async () => {
            const findAllStub = sinon.stub(BatteryLogs, 'findAll').returns([]);

            const result = await BatteryLogsController.getAllBatteryLogs();

            expect(result).to.be.an('array').that.is.empty;
            expect(findAllStub.calledOnce).to.be.true;

            findAllStub.restore();
        });
    });
});
