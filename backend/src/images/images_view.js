const { parseErrorField } = require('../utils/parse_errors')

const createView = (res, image) => {
  res.status(200).json({
    image: parseImageResponse(image)
  })
}

const parseImageResponse = (image) => ({
  id: image.id,
  name: image.name,
  extension: image.extension,
  userId: image.userId
})

const allImagesView = (res, images) => {
  res.status(200).json({
    images: images.map(parseImageResponse)
  })
}

const getImageView = (res, image) => {
  res.status(200).json({
    image: parseImageResponse(image)
  })
}

const getResourceView = (res, path) => {
  res.status(200).sendFile(path)
}

const successView = (res, message) => {
  res.status(200).json({
    message
  })
}

const errorView = (res, error) => {
  res.status(error.code || 500).json({
    message: error.message
  })
}

const fieldsError = (res, error) => {
  const errors = error.fields.map(parseErrorField)

  res.json({
    message: error.message,
    fields: errors
  })
}

module.exports = {
  create: createView,
  get: getImageView,
  allImagesView,
  getResourceView,
  fieldsError,
  errorView,
  successView
}
