const routes = require("express").Router();

const refreshTokenCheck = require('./tokenChecks/refresh_tokenCheck')
const accessTokenCheck = require('./tokenChecks/access_tokenCheck')

const newToken = require('../controllers/token/newToken')
const tokenLogin = require('../controllers/token/tokenLogin')

routes.get('/', refreshTokenCheck, newToken)
routes.get('/login', accessTokenCheck, tokenLogin)

module.exports = routes