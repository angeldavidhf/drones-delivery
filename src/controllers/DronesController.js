const { ApolloError } = require('apollo-server-express');
const { Drones, BatteryLogs } = require('../models');
const cron = require("node-cron");

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

    createDrone: async (input) => {
        const { serialNumber, model, weightLimit, battery } = input;
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
                flagDelete: false,
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

            drone.flagDelete = !drone.flagDelete;

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


    initBatteryCheckTask: () => {
        cron.schedule('*/10 * * * *', async () => {
            try {
                const drones = await Drones.findAll({
                    where: { flagDelete: false }
                });

                for (const drone of drones) {
                    const currentBatteryLevel = drone.battery;
                    await BatteryLogs.create({
                        droneId: drone.id,
                        batteryLevel: currentBatteryLevel,
                    });
                }

                console.log(':::::::::::::::::::::. Battery check task executed successfully .:::::::::::::::::::::');
            } catch (error) {
                console.error('Error executing battery check task:', error.message);
            }
        });
    },
}

module.exports = DronesController;