const router = require('express').Router();

module.exports = (api) => {

    router.get('/',
   		api.middlewares.isAuthenticated,
    	api.middlewares.acl.ensure(["root", "admin"]),
	    api.actions.rent.list);

    router.get('/:id', 
   		api.middlewares.isAuthenticated,
    	api.actions.rent.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.actions.rent.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.middlewares.isAuthenticated,
        api.actions.rent.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("root"),
        api.actions.rent.remove);
        
    return router;
};
