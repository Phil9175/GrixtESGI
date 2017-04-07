module.exports = (api) => {
    api.actions = {
        users: require('./users')(api),
        cars: require('./cars')(api),
        carsmodels: require('./carsmodels')(api),
        pickup: require('./pickup')(api),
        auth: require('./auth')(api),
        rent: require('./rent')(api)
    };
};