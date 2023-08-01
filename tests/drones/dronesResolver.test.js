const { expect } = require('chai');
const sinon = require('sinon');
const { ApolloError } = require('apollo-server-express');
const DronesController = require('../../src/controllers/DronesController');
const dronesResolver = require('../../src/resolvers/dronesResolver');

describe('Drones Resolver', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should get all drones', async () => {
        const dronesData = [
            {
                id: 1,
                serialNumber: 'DRN001',
                model: 'LightWeight',
                weightLimit: 100,
                battery: 100,
                state: 'IDLE',
                flagDelete: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 2,
                serialNumber: 'DRN002',
                model: 'MiddleWeight',
                weightLimit: 200,
                battery: 80,
                state: 'DELIVERING',
                flagDelete: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];

        const getAllDronesStub = sinon.stub(DronesController, 'getAllDrones').resolves(dronesData);

        const result = await dronesResolver.Query.getAllDrones();

        expect(result).to.deep.equal(dronesData);
        expect(getAllDronesStub.calledOnce).to.be.true;
    });

    it('should get drone by ID', async () => {
        const droneData = {
            id: 1,
            serialNumber: 'DRN003',
            model: 'CruiserWeight',
            weightLimit: 300,
            battery: 70,
            state: 'DELIVERED',
            flagDelete: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const getDroneByIdStub = sinon.stub(DronesController, 'getDroneById').resolves(droneData);

        const result = await dronesResolver.Query.getDroneById(null, { id: droneData.id });

        expect(result).to.deep.equal(droneData);
        expect(getDroneByIdStub.calledOnceWith(droneData.id)).to.be.true;
    });

    it('should get drones by state', async () => {
        const dronesData = [
            {
                id: 3,
                serialNumber: 'DRN004',
                model: 'HeavyWeight',
                weightLimit: 400,
                battery: 60,
                state: 'IDLE',
                flagDelete: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];

        const getDronesByStateStub = sinon.stub(DronesController, 'getDronesByState').resolves(dronesData);

        const result = await dronesResolver.Query.getDronesByState(null, { state: 'IDLE' });

        expect(result).to.deep.equal(dronesData);
        expect(getDronesByStateStub.calledOnceWith('IDLE')).to.be.true;
    });

    it('should create a new drone', async () => {
        const droneData = {
            serialNumber: 'DRN005',
            model: 'LightWeight',
            weightLimit: 150,
            battery: 75,
            state: 'IDLE',
            flagDelete: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const createDroneInput = {
            input: {
                serialNumber: 'DRN005',
                model: 'LightWeight',
                weightLimit: 150,
                battery: 75,
            },
        };

        const createDroneStub = sinon.stub(DronesController, 'createDrone').resolves(droneData);

        const result = await dronesResolver.Mutation.createDrone(null, createDroneInput);

        expect(result).to.deep.equal(droneData);
        expect(createDroneStub.calledOnceWith(createDroneInput.input)).to.be.true;
    });
});
