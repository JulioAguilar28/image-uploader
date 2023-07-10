const Router = require('express').Router
const AuthRouter = Router()

const AuthController = require('./controller.js')

AuthRouter.route('/login').post(AuthController.login)
AuthRouter.route('/signup').post(AuthController.signup)

module.exports = AuthRouter
