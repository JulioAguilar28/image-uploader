class ImageFieldsError extends Error {
  message
  code
  fields

  constructor(message, fields, code) {
    super(message)
    this.message = message
    this.fields = fields
    this.code = code
  }

  static of(message, fields, code = 422) {
    return new ImageFieldsError(message, fields, code)
  }
}

class ImageInvalidFormatError extends Error {
  message
  code

  constructor(message, fields, code) {
    super(message)
    this.message = message
    this.code = code
  }

  static of(message, code = 422) {
    return new ImageInvalidFormatError(message, code)
  }
}

module.exports = {
  ImageFieldsError,
  ImageInvalidFormatError
}
