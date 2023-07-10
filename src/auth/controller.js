const { Users } = require('../db/models/index.js')
const AuthService = require('./service.js')
const AuthView = require('./view.js')
const { AuthError, AuthFieldError } = require('./errors.js')

const login = async (req, res) => {
  try {
    const user = await AuthService.login(req.body)
    AuthView.loginView(res, user)
  } catch (error) {
    if (error instanceof AuthError || error instanceof AuthFieldError) {
      return AuthView.loginErrorView(res, { error: error.message })
    }

    AuthView.loginErrorView(res, error)
  }
}

const signup = (req, res) => {
  Users.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      console.log(error)
      res.json(error)
    })
}

module.exports = {
  login,
  signup
}
