module.exports = (api) => {
    api.use(api.middlewares.logger);
    api.use(api.middlewares.res);

    api.use('/users', require('./users')(api));
    api.use('/cars', require('./cars')(api));
    api.use('/carsmodels', require('./carsmodels')(api));
    api.use('/auth', require('./auth')(api));
    api.use('/pickup', require('./pickup')(api));
};