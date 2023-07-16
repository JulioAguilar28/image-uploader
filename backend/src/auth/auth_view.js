const { parseErrorField } = require('../utils/parse_errors')

const loginView = (res, user) => {
  res.status(200).json({
    user: getUserResponse(user)
  })
}

const authErrorView = (res, error) => {
  res.status(error.code || 422).json({
    message: error.message
  })
}

const getUserResponse = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  token: user.token
})

const signupView = (res, user) => {
  res.status(200).json(getUserResponse(user))
}

const unexpectedErrorView = (res, error) => {
  res.status(error.code || 500).json(error)
}

const signupErrorView = (res, error) => {
  const errors = error.fields.map(parseErrorField)

  res.status(error.code).json({
    message: error.message,
    fields: errors
  })
}

module.exports = {
  loginView,
  authErrorView,
  unexpectedErrorView,
  signupView,
  signupErrorView
}
