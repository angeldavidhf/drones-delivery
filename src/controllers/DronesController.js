const { Drones, BatteryLogs } = require('../models');
const cron = require("node-cron");

const DronesController = {
    getAllDrones: async () => {
        try {
            const drones = await Drones.findAll({
                include: {
                    model: BatteryLogs,
                    as: 'battery_logs',
                },
                where: { flagDelete: false }
            });
            return drones;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getDroneById: async (id) => {
        try {
            const drone = await Drones.findOne({
                include: {
                    model: BatteryLogs,
                    as: 'battery_logs',
                },
                where: {
                    id: id,
                    flagDelete: false,
                },
            });
            if (!drone) {
                throw new Error('Drone not found.');
            }
            return drone;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    createDrone: async (input) => {
        try {
            const { serialNumber, model, weightLimit, battery } = input;
            const validModels = ['LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'];

            if (!validModels.includes(model)) {
                throw new Error('Invalid drone model.');
            }

            if (weightLimit < 0 || weightLimit > 500) {
                throw new Error('Invalid weight. Weight limit must be between 0 and 500.');
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
            throw new Error(error.message);
        }
    },

    updateDrone: async (input) => {
        try {
            const { id, model, weightLimit, battery } = input;
            const validModels = ['LightWeight', 'MiddleWeight', 'CruiserWeight', 'HeavyWeight'];

            if (!validModels.includes(model)) {
                throw new Error('Invalid drone model.');
            }

            if (weightLimit < 0 || weightLimit > 500) {
                throw new Error('Invalid weight. Weight limit must be between 0 and 500.');
            }

            if (battery < 0 || battery > 100) {
                throw new Error('Invalid battery level. Battery level must be between 0 and 100.');
            }

            const drone = await Drones.findOne({
                where: {
                    id: id,
                    flagDelete: false,
                },
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
            throw new Error(error.message);
        }
    },

    temporaryDeleteDrone: async (id) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: id,
                    flagDelete: false,
                },
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            drone.flagDelete = !drone.flagDelete;

            await drone.save();

            return true;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    permanentDeleteDrone: async (id) => {
        try {
            const drone = await Drones.findOne({
                where: {
                    id: id,
                    flagDelete: false,
                }
            });

            if (!drone) {
                throw new Error('Drone not found.');
            }

            await BatteryLogs.destroy({
                where: { droneId: id },
            });

            await drone.destroy();

            return true;
        } catch (error) {
            throw new Error(error.message);
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
                console.error('Error executing battery check task: ', error.message);
            }
        });
    },
}

module.exports = DronesController;