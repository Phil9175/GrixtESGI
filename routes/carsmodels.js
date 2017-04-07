const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.cars.list);

    router.get('/:id', api.actions.cars.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.cars.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.actions.cars.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("root"),
        api.actions.cars.remove);
        
    return router;
};
