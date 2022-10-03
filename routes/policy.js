const routes = require("express").Router();

const tokenCheck = require('./tokenChecks/access_tokenCheck')
const list = require("../controllers/policy/list");
const search = require('../controllers/policy/search')

routes.get('/', tokenCheck, list);
routes.get('/search',tokenCheck ,search)

module.exports = routes;