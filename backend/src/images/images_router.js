const express = require('express')
const Router = require('express').Router
const imagesRouter = Router()
const ImagesController = require('./images_controller')
const AuthMiddleware = require('../middlewares/is_logged_in')
const path = require('path')

imagesRouter.use(AuthMiddleware, (req, _res, next) => {
  /**
   * This way we provide only the current user folder statically
   * avoiding the other users to access all images
   */
  const imagesStaticPath = path.join(path.resolve(), `public/images/${req.currentUser}`)
  imagesRouter.use('/static', express.static(imagesStaticPath))

  next()
})

imagesRouter
  .route('')
  .get(ImagesController.getAll)
  .post(ImagesController.upload, ImagesController.create)

imagesRouter.route('/:id').get(ImagesController.get).delete(ImagesController.delete)

module.exports = imagesRouter
