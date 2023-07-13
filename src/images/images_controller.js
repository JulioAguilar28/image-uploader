const multer = require('multer')
const path = require('path')
const ImageService = require('./images_service')
const ImageView = require('./images_view')
const { ImageFieldsError, ImageInvalidFormatError } = require('./images_errors')

const allowedImageFormats = ['jpeg', 'jpg', 'png']

const storage = multer.diskStorage({
  destination: async function (req, _file, cb) {
    const dir = path.resolve(`public/images/${req.currentUser}/`)
    cb(null, dir)
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileFormat = file.mimetype.split('/').at(1)
    const isValidFormat = allowedImageFormats.includes(fileFormat)

    cb(null, isValidFormat)
  }
}).single('image')

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
    const image = await ImageService.createImage(req.file, req.currentUser)
    ImageView.create(res, image)
  } catch (error) {
    console.error(`create error: ${error}`)

    if (error instanceof ImageFieldsError) ImageView.fieldsError(res, error)
    if (error instanceof ImageInvalidFormatError) ImageView.errorView(res, error)

    res.json(error)
  }
}

module.exports = {
  create,
  getAll,
  upload
}
