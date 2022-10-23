const routes = require("express").Router();

const tokenCheck = require('./tokenChecks/access_tokenCheck')
const toggle = require("../controllers/scrab/toggle");
const add = require('../controllers/scrab/add')
const del = require('../controllers/scrab/delete')


routes.post('/', tokenCheck, add);
routes.delete('/', tokenCheck, del);


module.exports = routes;