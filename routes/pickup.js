
const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.pickup.list);

    router.get('/:id', api.actions.pickup.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.middlewares.ensureFields(['maxEmplacement', 'latitude', 'longitude', 'name']),
        api.actions.pickup.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.actions.pickup.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(["root", "admin"]),
        api.actions.pickup.remove);

    router.post('/:id/rent',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(3),
        api.actions.pickup.rent);

    return router;
};
