const routes = require('express').Router();
const db = require('../database/dbAdapter');
const config = require('../configs/index');
const checkAuth = require('../middlewares/auth_check');

routes.get('/', (req, res) => { res.status(200).json({ message: 'Connected!' }); });

routes.use('/auth', require('./auth.js')(db, config));
routes.use('/users', require('./users.js')(db));
routes.use('/tasks', require('./tasks.js')(checkAuth.checkToken,db));


module.exports = routes;