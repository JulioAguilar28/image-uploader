const { Images } = require('../db/models/index')
const { ValidationError } = require('sequelize')
const { ImageFieldsError, ImageInvalidFormatError } = require('./images_errors')
const fs = require('fs/promises')
const path = require('path')

const existsImageDir = async (userId) => {
  try {
    await fs.access(path.resolve(`public/images/${userId}`))
    return true
  } catch (error) {
    return false
  }
}

const createUserImageDir = async (userId) => {
  try {
    return await fs.mkdir(path.resolve(`public/images/${userId}`))
  } catch (error) {
    console.error(`createUserDir() | ${error}`)
  }
}

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

const createImage = async (imageFile, userId) => {
  try {
    if (!imageFile) throw ImageInvalidFormatError.of('Invalid image format', 422)

    const { filename, mimetype } = imageFile
    const name = filename.split('.').at(0)
    const extension = mimetype.split('/').at(1)

    return await Images.create({
      name,
      extension,
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
  getImagesByUserId,
  existsImageDir,
  createUserImageDir
}
