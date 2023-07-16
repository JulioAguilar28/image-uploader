const { Users } = require('../db/models/index.js')
const { AuthError, NewUserFieldsError } = require('./auth_errors.js')
const { ValidationError } = require('sequelize')
const jwt = require('jsonwebtoken')
const { createUserImageDir, existsImageDir } = require('../images/images_service.js')

const login = async (email, password) => {
  try {
    const user = await Users.login(email, password)

    if (user) {
      await signUserToken(user)

      const exists = await existsImageDir(user.id)
      if (!exists) await createUserImageDir(user.id)

      return user
    }

    throw AuthError.of('email or password are incorrect')
  } catch (error) {
    console.error(`AuthService login() | ${error}`)
    throw error
  }
}

const signup = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password
    })

    await signUserToken(newUser)
    await createUserImageDir(newUser.id)

    return newUser
  } catch (error) {
    console.error(`AuthService sigup() | ${error}`)

    if (error instanceof ValidationError)
      throw NewUserFieldsError.of('The following fields are incorrect', error.errors, 422)

    throw error
  }
}

const signUserToken = async (user) => {
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)
  user.token = token

  return user
}

module.exports = {
  login,
  signup
}
