const { expect } = require('chai');
const sinon = require('sinon');
const BatteryLogsController = require('../../src/controllers/BatteryLogsController');
const batteryLogsResolver = require('../../src/resolvers/batteryLogsResolver');

describe('BatteryLogs Resolver', () => {
    describe('Query.getAllBatteryLogs', () => {
        it('should return all battery logs', async () => {
            const getAllBatteryLogsStub = sinon.stub(BatteryLogsController, 'getAllBatteryLogs').returns([]);

            const result = await batteryLogsResolver.Query.getAllBatteryLogs();

            expect(result).to.be.an('array').that.is.empty;
            expect(getAllBatteryLogsStub.calledOnce).to.be.true;

            getAllBatteryLogsStub.restore();
        });
    });

    describe('Query.getBatteryLogsForDrone', () => {
        it('should return battery logs for a specific drone', async () => {
            const getBatteryLogsForDroneStub = sinon.stub(BatteryLogsController, 'getBatteryLogsForDrone').returns([]);

            const dummyDroneId = 1;
            const result = await batteryLogsResolver.Query.getBatteryLogsForDrone({}, { droneId: dummyDroneId });

            expect(result).to.be.an('array').that.is.empty;
            expect(getBatteryLogsForDroneStub.calledOnce).to.be.true;
            expect(getBatteryLogsForDroneStub.firstCall.args[0]).to.equal(dummyDroneId);

            getBatteryLogsForDroneStub.restore();
        });
    });

    describe('Mutation.deleteBatteryLogsForDrone', () => {
        it('should delete battery logs for a specific drone', async () => {
            const deleteBatteryLogsForDroneStub = sinon.stub(BatteryLogsController, 'deleteBatteryLogsForDrone').returns(true);

            const dummyDroneId = 1;
            const result = await batteryLogsResolver.Mutation.deleteBatteryLogsForDrone({}, { droneId: dummyDroneId });

            expect(result).to.be.true;
            expect(deleteBatteryLogsForDroneStub.calledOnce).to.be.true;
            expect(deleteBatteryLogsForDroneStub.firstCall.args[0]).to.equal(dummyDroneId);

            deleteBatteryLogsForDroneStub.restore();
        });
    });
});
