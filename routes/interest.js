const routes = require("express").Router();
const list = require("../controllers/interest/list");
const add = require('../controllers/interest/add')

routes.get('/', list)
routes.post('/', add)

module.exports = routes;