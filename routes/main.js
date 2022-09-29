const routes = require("express").Router();
const tokenCheck = require('./tokenChecks/access_tokenCheck')
const main = require("../controllers/main/get");

routes.get('/', tokenCheck, main)

module.exports = routes;