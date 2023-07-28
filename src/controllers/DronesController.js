const { ApolloError } = require('apollo-server-express');
const { Drones } = require('../models');

const DronesController = {
    getAllDrones: async () => {
        try {
            const drones = await Drones.findAll({
                include: 'battery_logs',
                where: { flagDelete: false }
            });
            return drones;
        } catch (error) {
            throw new Error(`Error fetching drones: ${error.message}`);
        }
    },
    getDroneById: async (id) => {
        try {
            const drone = await Drones.findByPk(id, {
                include: 'battery_logs',
                where: { flagDelete: false }
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }
            return drone;
        } catch (error) {
            throw new Error(`Error fetching drone by ID: ${error.message}`);
        }
    },
    createDrone: async ({ serialNumber, model, weightLimit, battery }) => {
        try {
            const validModels = ['LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'];

            if (!validModels.includes(model)) {
                throw new Error('Invalid drone model.');
            }

            if (battery < 0 || battery > 100) {
                throw new Error('Invalid battery level. Battery level must be between 0 and 100.');
            }

            const newDrone = await Drones.create({
                serialNumber,
                model,
                weightLimit,
                battery,
                state: 'IDLE',
                flagDrop: false,
            });

            return newDrone;
        } catch (error) {
            throw new Error(`Error creating drone: ${error.message}`);
        }
    },
    updateDrone: async ({ id, model, weightLimit, battery }) => {
        try {
            const validModels = ['LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'];

            if (!validModels.includes(model)) {
                throw new Error('Invalid drone model.');
            }

            if (battery < 0 || battery > 100) {
                throw new Error('Invalid battery level. Battery level must be between 0 and 100.');
            }

            const drone = await Drones.findByPk(id, {
                where: { flagDelete: false }
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            drone.model = model;
            drone.weightLimit = weightLimit;
            drone.battery = battery;

            await drone.save();

            return drone;
        } catch (error) {
            throw new Error('Error updating drone.');
        }
    },
    temporaryDeleteDrone: async (id) => {
        try {
            const drone = await Drones.findByPk(id, {
                where: { flagDelete: false }
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            drone.flagDelete = true;

            await drone.save();

            return true;
        } catch (error) {
            throw new Error('Error deleting drone.');
        }
    },
    permanentDeleteDrone: async (id) => {
        try {
            const drone = await Drones.findByPk(id, {
                where: { flagDelete: false }
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            await drone.destroy();

            return true;
        } catch (error) {
            throw new Error('Error deleting drone.');
        }
    },
}

module.exports = DronesController;