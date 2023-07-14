class AuthError extends Error {
  constructor(message, code) {
    super(message)
    this.message = message
    this.code = code
  }

  static of(message, code = 422) {
    return new AuthError(message, code)
  }
}

class NewUserFieldsError extends Error {
  message = ''
  code = 422
  fields = []

  constructor(message, fields, code) {
    super(message)
    this.message = message
    this.code = code
    this.fields = fields
  }

  static of(message, fields = [], code = 422) {
    return new NewUserFieldsError(message, fields, code)
  }
}

module.exports = {
  AuthError,
  NewUserFieldsError
}
