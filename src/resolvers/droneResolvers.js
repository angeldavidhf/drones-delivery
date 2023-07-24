const { Drone } = require('../models');

const droneResolvers = {
    Query: {
        drones: () => Drone.findAll(),
        drone: (_, { id }) => Drone.findByPk(id),
    },
    Mutation: {
        createDrone: (_, { input }) => Drone.create(input),
        updateDrone: async (_, { id, input }) => {
            const drone = await Drone.findByPk(id);
            if (!drone) {
                throw new Error(`Drone with ID ${id} not found.`);
            }
            return drone.update(input);
        },
        deleteDrone: async (_, { id }) => {
            const drone = await Drone.findByPk(id);
            if (!drone) {
                throw new Error(`Drone with ID ${id} not found.`);
            }
            await drone.destroy();
            return true;
        },
    },
};

module.exports = droneResolvers;