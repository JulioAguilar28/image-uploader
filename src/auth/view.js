const loginView = (res, user) => {
  res.status(200).json(getLoginResponse(user))
}

const getUserResponse = (user) => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
})

const getLoginResponse = (user) => ({
  ...getUserResponse(user),
  token: 'SomeToken'
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

const parseErrorField = (field) => ({
  field: field.path,
  currentValue: field.value,
  message: field.message
})

module.exports = {
  loginView,
  unexpectedErrorView,
  signupView,
  signupErrorView
}