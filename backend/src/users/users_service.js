const { Users } = require('../db/models/index')
const { UserNotFoundError } = require('./users_error')

const getUserById = async (id) => {
  try {
    const user = await Users.findOne({
      where: { id }
    })

    if (!user) throw UserNotFoundError.of(`User with id ${id} not found`, 404)

    return user
  } catch (error) {
    console.error(`User Service getUserById() | ${error}`)

    throw error
  }
}

module.exports = {
  getUserById
}
