const express = require('express')
const Router = require('express').Router
const imagesRouter = Router()
const ImagesController = require('./images_controller')
const AuthMiddleware = require('../middlewares/is_logged_in')
const path = require('path')

imagesRouter.use(AuthMiddleware)

// uploades images files
// TODO: Find a way to provide only images for the current user
// for now, we provide all uploaded images
const imagesStaticPath = path.join(path.resolve(), 'public/images/')
imagesRouter.use('/static', express.static(imagesStaticPath))

imagesRouter
  .route('')
  .get(ImagesController.getAll)
  .post(ImagesController.upload, ImagesController.create)

imagesRouter.route('/:id').get(ImagesController.get).delete(ImagesController.delete)

module.exports = imagesRouter
