const ImageService = require('./images_service')
const ImageView = require('./images_view')
const { ImageFieldsError } = require('./images_errors')

const getAll = async (req, res) => {
  try {
    const images = await ImageService.getImagesByUserId(req.currentUser)
    ImageView.allImagesView(res, images)
  } catch (error) {
    res.json(error)
  }
}

const create = async (req, res) => {
  try {
    const image = await ImageService.createImage(req.body, req.currentUser)
    ImageView.create(res, image)
  } catch (error) {
    if (error instanceof ImageFieldsError) ImageView.fieldsError(res, error)

    res.json(error)
  }
}

module.exports = {
  create,
  getAll
}
