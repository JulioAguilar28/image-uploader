const { Images } = require('../db/models/index')
const { ValidationError } = require('sequelize')
const { ImageFieldsError } = require('./images_errors')

const getImagesByUserId = async (userId) => {
  try {
    return await Images.findAll({
      where: { userId }
    })
  } catch (error) {
    console.error(`Images Services getImagesByUserId() | ${error}`)
    throw error
  }
}

const createImage = async (imagesParams, userId) => {
  try {
    return await Images.create({
      ...imagesParams,
      userId
    })
  } catch (error) {
    console.error(`Images Service createImage() | ${error}`)

    if (error instanceof ValidationError)
      throw ImageFieldsError.of('The followings field are incorrect', error.errors, 422)

    throw error
  }
}

module.exports = {
  createImage,
  getImagesByUserId
}
