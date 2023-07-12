const { AuthError } = require('../auth/auth_errors')
const AuthView = require('../auth/auth_view')
const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
  if (!req.headers.authorization)
    AuthView.authErrorView(res, AuthError.of('Unauthorized: You must provide a token', 401))

  if (!req.headers.authorization.startsWith('Bearer '))
    AuthView.authErrorView(res, AuthError.of('Unauthorized: You must provide a valid token', 401))

  const token = req.headers.authorization.split('Bearer ')[1]
  jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
    if (error) {
      console.error(`AuthMiddleware isLoggedIn() | ${error}`)

      return AuthView.authErrorView(
        res,
        AuthError.of('Unauthorized: You must provide a valid token', 401)
      )
    }

    req.currentUser = decoded.id
    next()
  })
}

module.exports = isLoggedIn
