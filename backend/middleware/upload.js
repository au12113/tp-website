const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multerStorage = multer.memoryStorage()

if (!fs.existsSync(path.join(__sharedir, `/uploads/`))) {
  fs.mkdirSync(path.join(__sharedir, `/uploads/`), { recursive: true })
}

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

const uploadFile = upload.single('file')

const getResult = async (req, res) => {
  try {
    if(req.file === undefined) {
      return res.send(`You must select a file`)
    } else {
      return res.send(`file has uploaded`)
    }
  } catch (e) {
    console.log(e)
    return res.send(`Error when trying upload images: ${e}`)
  }
}

const resizeImage = async (req, res, next) => {
  if(!req.file) {
    return next()
  }
  const filename = req.file.originalname.replace(/\..+$/, '')
  const newFileName = `${filename}.webp`
  req.body.buffer = await sharp(req.file.buffer)
    .resize({ width: 640 })
    .toFormat('webp')
    .webp({ quality: 90 })
    .toFile(path.join(__sharedir, `/uploads/${newFileName}`))
  next()
}

module.exports = { resizeImage, uploadFile, getResult }