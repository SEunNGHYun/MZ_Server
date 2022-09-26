const routes = require("express").Router();
const signup  = require('../controllers/user/signup');
const login = require('../controllers/user/login');
const leave = require('../controllers/user/leave');
const info = require('../controllers/user/info');
const config = require('../controllers/user/config');

routes.post('/signup', signup)
routes.post('/login', login)
routes.delete('/leave', leave)
routes.get('/info', info)
routes.patch('/config', config)

module.exports = routes;