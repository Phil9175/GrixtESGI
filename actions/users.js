const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Role = api.models.Role;

    function create(req, res, next) {
        let user = new User(req.body);

        user.password = sha1(user.password);

        return ensureEmailDoesNotExist()
            .then(assignRoleDefault)
            .then(save)
            .then(respond)
            .catch(spread);

        function ensureEmailDoesNotExist() {
            return User.findOne({
                email: req.body.email
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
        }

        function assignRoleDefault() {
          return Role.findOne({
              name: "user"
          })
          .then(define);

          function define(role) {
            user.role = role._id;
            return user;
          }
        }

        function save() {
            return user.save();
        }

        function respond() {
            res.status(201).send();
        }

        function spread() {
            res.status(500).send();
        }
    }

    function list(req, res, next) {
        User.find()
            .then(respond)
            .catch(spread);

        function respond(data) {
            res.send(data);
        }

        function spread(reason) {
            res.status(500).send();
        }
    }

    function show(req, res, next) {
        User.findById(req.params.id)
            .then(ensureOne)
            .then(res.prepare(200))
            .catch(res.prepare(404));

        function ensureOne(data) {
            return (data) ? data : Promise.reject('user.not.found');
        }
    }

    function update(req, res, next) {
        if(req.body.password)
          req.body.password = sha1(req.body.password);

        User.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }


    function assign(req, res, next) {
        let target = null;
        let role = null;

        findTarget()
            .then(findRole)
            .then(validateIssuer)
            .then(validateTarget)
            .then(assignRole)
            .then(res.prepare(204))
            .then(res.error);

        function findTarget() {
            return User.findById(req.params.id)
                .select('+role')
                .then(ensureOne)
                .then(set);

            function ensureOne(user) {
                return (user) ? user : Promise.reject({code: 404, reason: 'user.not.found'});
            }

            function set(user) {
                target = user;
            }
        }

        function findRole() {
            return Role.findById(req.params.roleId)
                .then(ensureOne)
                .then(set);

            function ensureOne(role) {
                return (role) ? role : Promise.reject({code: 404, reason: 'role.not.found'})
            }

            function set(instance) {
                return role = instance;
            }
        }

        function validateIssuer(role) {
            return (req.role.level <= role.level) ? role : Promise.reject({code: 403, reason: 'role.too.high'})
        }

        function validateTarget() {
            return findTargetRole()
                .then(ensureLowerThanIssuer);

            function findTargetRole() {
                return Role.findById(target.role);
            }

            function ensureLowerThanIssuer(role) {
                return (!role || role.level >= req.userRole)? true : Promise.reject({code: 403, reason: 'target.level.too.high'})
            }

        }

        function assignRole() {
            return User.findByIdAndUpdate(req.params.id, {
                role: role._id.toString()
            });
        }
    }

    function owner(req, res, next) {
        const encryptedToken = req.headers.authorization;

        if(!encryptedToken)
            return unauthorized();

        jwt.verify(encryptedToken, api.settings.security.secret, (err, token) => {
            if (err || !token || !token.userId) {
                return unauthorized();
            }

            User.findById(token.userId)
                .select("+role")
                .then(ensureOne)
                .then(authorize)
                .catch(unauthorized);

            function ensureOne(user) {
                return (user) ? user : Promise.reject();
            }

            function authorize(user) {

                Role.findById(user.role)
                    .then(checkAdmin);

                function checkAdmin(role) {
                  if(role.level > 1 && token.userId != req.params.id)
                    return unauthorized();
                }

                req.userId = token.userId;
                req.role = token.role;
                next();
            }
        });

        function unauthorized() {
            return res.status(401).send('unauthorized');
        }
    }

    return {
        create,
        list,
        show,
        update,
        remove,
        assign,
        owner
    };
};
