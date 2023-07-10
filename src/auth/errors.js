class AuthError extends Error {
  constructor(message, code) {
    super(message)
    this.message = message
    this.code = code
  }

  static of(message = 'email or password are incorrect', code = 422) {
    return new AuthError(message, code)
  }
}

class AuthFieldError extends Error {
  constructor(message, code) {
    super(message)
    this.message = message
    this.code = code
  }

  static of(message = 'email and password field are required', code = 422) {
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
  AuthFieldError,
  NewUserFieldsError
}
