const routes = require("express").Router();
const add = require("../controllers/scrab/add");
const remove = require('../controllers/scrab/delete');

routes.post('/', add);
routes.delete('/', remove);

module.exports = routes;