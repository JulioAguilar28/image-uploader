const Router = require('express').Router
const AuthRouter = Router()
const AuthMiddleware = require('../middlewares/is_logged_in')

const AuthController = require('./auth_controller.js')

AuthRouter.route('/login').post(AuthController.login)
AuthRouter.route('/signup').post(AuthController.signup)
AuthRouter.route('/credentials').get(AuthMiddleware, AuthController.getCurrentUser)

module.exports = AuthRouter
