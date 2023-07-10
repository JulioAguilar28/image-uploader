const { Users } = require('../db/models/index.js')
const { AuthError } = require('./errors.js')

const login = async (email, password) => {
  try {
    const user = await Users.login(email, password)

    if (user) {
      // sign a JWT and add the token to the user
      return user
    }

    throw AuthError.of()
  } catch (error) {
    console.error(`AuthService login() | ${error}`)
    throw error
  }
}

module.exports = {
  login
}
