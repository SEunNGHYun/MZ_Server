const routes = require("express").Router();
const list = require("../controllers/policy/list");

routes.get('/', list);



module.exports = routes;