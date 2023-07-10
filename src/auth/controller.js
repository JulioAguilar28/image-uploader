const { Users } = require('../db/models/index.js')
const AuthService = require('./service.js')
const AuthView = require('./view.js')
const { AuthError, AuthFieldError, NewUserFieldsError } = require('./errors.js')

const login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body)
    AuthView.loginView(res, user)
  } catch (error) {
    if (error instanceof AuthError || error instanceof AuthFieldError) {
      return AuthView.loginErrorView(res, { error: error.message })
    }

    AuthView.unexpectedErrorView(res, error)
  }
}

const signup = async (req, res) => {
  try {
    const user = await AuthService.signup(req.body)
    AuthView.signupView(res, user)
  } catch (error) {
    if (error instanceof NewUserFieldsError) return AuthView.signupErrorView(res, error)

    AuthView.unexpectedErrorView(res, error)
  }
}

module.exports = {
  login,
  signup
}
