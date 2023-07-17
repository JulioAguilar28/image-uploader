const Router = require('express').Router
const AuthRouter = Router()
const IsLoggedInMiddleware = require('../middlewares/is_logged_in')

const AuthController = require('./auth_controller.js')

AuthRouter.route('/login').post(AuthController.login)
AuthRouter.route('/signup').post(AuthController.signup)
AuthRouter.route('/credentials').get(IsLoggedInMiddleware, AuthController.getCurrentUser)

module.exports = AuthRouter
