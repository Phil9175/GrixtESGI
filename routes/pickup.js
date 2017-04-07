const router = require('express').Router();

module.exports = (api) => {

    router.post('/:id/rent',
                api.middlewares.bodyParser.json(),
                api.middlewares.acl.ensure(3),
                api.actions.pickup.rent);

    return router;
};
