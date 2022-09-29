const routes = require("express").Router();

const tokenCheck = require('./tokenChecks/access_tokenCheck')
const list = require("../controllers/policy/list");

routes.get('/', tokenCheck, list);

module.exports = routes;