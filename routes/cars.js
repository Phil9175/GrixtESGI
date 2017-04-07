const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.cars.list);

    router.get('/:id', api.actions.cars.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['modelOfCar', 'pickupId']),
        api.actions.cars.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['modelOfCar', 'pickupId']),
        api.actions.cars.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.actions.cars.remove);
        
    return router;
};
