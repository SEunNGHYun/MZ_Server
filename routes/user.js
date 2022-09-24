const routes = require("express").Router();
const signup  = require('../controllers/user/signup')
const login = require('../controllers/user/login');

// routes.get('/')
routes.post('/signup', signup)
routes.post('/login', login)


module.exports = routes;