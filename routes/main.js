const routes = require("express").Router();
const main = require("../controllers/main/get");

routes.get('/', main)

module.exports = routes;