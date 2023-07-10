const loginView = (res, user) => {
  res.status(200).json(getUserResponse(user))
}

const getUserResponse = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  token: 'Some token'
})

const loginErrorView = (res, error) => {
  res.status(error.code || 422).json(error)
}

module.exports = {
  loginView,
  loginErrorView
}
