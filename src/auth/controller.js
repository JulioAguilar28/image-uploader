const { Users } = require('../db/models/index.js')

const login = async (req, res) => {
  try {
    const valid = await Users.login(req.body)
    if (valid) res.json({ message: 'login successfully' })
    else res.json({ message: 'Email or password incorrect' })
  } catch (error) {
    res.json(error)
  }
}

const signup = async (req, res) => {
  try {
    const user = await Users.create(req.body)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  login,
  signup
}
