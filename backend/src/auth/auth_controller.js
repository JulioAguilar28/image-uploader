const AuthService = require('./auth_service.js')
const AuthView = require('./auth_view.js')
const { AuthError, NewUserFieldsError } = require('./auth_errors.js')

const login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body)
    AuthView.loginView(res, user)
  } catch (error) {
    if (error instanceof AuthError) {
      return AuthView.authErrorView(res, error)
    }

    AuthView.unexpectedErrorView(res, error)
  }
}

const signup = async (req, res) => {
  try {
    const user = await AuthService.signup(req.body)
    console.log(user)
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
