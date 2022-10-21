const routes = require("express").Router();

const tokenCheck = require('./tokenChecks/access_tokenCheck')
const toggle = require("../controllers/scrab/toggle");

routes.post('/', tokenCheck, toggle);

module.exports = routes;