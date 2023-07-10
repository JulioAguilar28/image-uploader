const { Users } = require('../db/models/index.js')
const { AuthError, NewUserFieldsError } = require('./errors.js')
const { ValidationError } = require('sequelize')

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

const signup = async ({ firstName, lastName, email, password }) => {
  try {
    return await Users.create({
      firstName,
      lastName,
      email,
      password
    })
  } catch (error) {
    console.error(`AuthService sigup() | ${error}`)

    if (error instanceof ValidationError)
      throw NewUserFieldsError.of('The following fields are incorrect', error.errors, 422)

    throw error
  }
}

module.exports = {
  login,
  signup
}
