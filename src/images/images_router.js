const Router = require('express').Router
const imagesRouter = Router()
const ImagesController = require('./images_controller')
const AuthMiddleware = require('../middlewares/is_logged_in')
imagesRouter.use(AuthMiddleware)

imagesRouter
  .route('')
  .get(ImagesController.getAll)
  .post(ImagesController.upload, ImagesController.create)

imagesRouter.route('/:id').get(ImagesController.get).delete(ImagesController.delete)

module.exports = imagesRouter
