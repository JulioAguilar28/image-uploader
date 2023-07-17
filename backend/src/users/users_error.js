class UserNotFoundError extends Error {
  code

  constructor(message, code) {
    super(`${message}`)
    this.code = code
  }

  static of(message, code) {
    return new UserNotFoundError(message, code)
  }
}

module.exports = {
  UserNotFoundError
}
