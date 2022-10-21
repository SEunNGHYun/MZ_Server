const routes = require("express").Router();

const accessTokenCheck = require('./tokenChecks/access_tokenCheck')

const signup  = require('../controllers/user/signup');
const login = require('../controllers/user/login');
const leave = require('../controllers/user/leave');
const info = require('../controllers/user/info');
const config = require('../controllers/user/config');

routes.post('/signup', signup)
routes.post('/login', login)
routes.delete('/leave', accessTokenCheck, leave)
routes.get('/info', accessTokenCheck, info)
routes.patch('/config', accessTokenCheck, config)



module.exports = routes;