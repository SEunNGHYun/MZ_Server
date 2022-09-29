const routes = require("express").Router();

const tokenCheck = require('./tokenChecks/access_tokenCheck')
const add = require("../controllers/scrab/add");
const remove = require('../controllers/scrab/delete');

routes.post('/', tokenCheck, add);
routes.delete('/', tokenCheck, remove);

module.exports = routes;