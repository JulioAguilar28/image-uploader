const { Images } = require('../db/models/index')
const { ValidationError } = require('sequelize')
const { ImageFieldsError, ImageInvalidFormatError, ImageNotFoundError } = require('./images_errors')
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

const removeImageFromDisk = async (filename, userId) => {
  try {
    const imageToRemovePath = path.resolve(`public/images/${userId}/${filename}`)
    await fs.rm(imageToRemovePath)
  } catch (error) {
    console.error(`ImagesService removeImageFromDisk() | ${error}`)
  }
}

const getImageByIdRequest = async (id) => {
  try {
    const image = await Images.findOne({
      where: { id }
    })

    if (!image) throw ImageNotFoundError.of(`Image with ${id} id not found`)

    return image
  } catch (error) {
    throw error
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

const getImageById = async (id) => {
  try {
    return getImageByIdRequest(id)
  } catch (error) {
    console.error(`Images Services getImageById() | ${error}`)

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

const deleteImage = async (id, userId) => {
  try {
    const image = await getImageByIdRequest(id)
    await removeImageFromDisk(`${image.name}.${image.extension}`, userId)
    await image.destroy()
  } catch (error) {
    console.error(`Images Service deleteImage() | ${error}`)

    throw error
  }
}

module.exports = {
  createImage,
  getImageById,
  getImagesByUserId,
  existsImageDir,
  createUserImageDir,
  deleteImage
}
