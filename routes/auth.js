const router = require('express').Router();

module.exports = (api) => {
    router.post('/login',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureFields(['email', 'password']),
        api.actions.auth.login);

    return router;
};
