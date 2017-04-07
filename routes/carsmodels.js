const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.carsmodels.list);

    router.get('/:id', api.actions.carsmodels.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['manufacturer', 'model', 'year', 'numberOfSeat']),
        api.actions.carsmodels.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['manufacturer', 'model', 'year', 'numberOfSeat']),
        api.actions.carsmodels.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['id']),
        api.actions.carsmodels.remove);
        
    return router;
};