const { expect } = require('chai');
const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');
const BatteryLogs = require('../../src/models/BatteryLogs');
const Drones = require('../../src/models/Drones');

describe('BatteryLogs Model', () => {
    before(async () => {
        await BatteryLogs.sync({ force: true });
    });

    it('should require droneId', async () => {
        try {
            await BatteryLogs.create({ batteryLevel: 90 });
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.include('droneId cannot be null');
        }
    });

    it('should require batteryLevel', async () => {
        try {
            await BatteryLogs.create({ droneId: 2 });
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.include('batteryLevel cannot be null');
        }
    });
});
