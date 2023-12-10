const express = require('express');
const router = express.Router()
const {addGallery, getAllGallery, getGalleryById, updateGallery, deleteGallery} = require('../controller/galleryController')
const { authMiddleware,permissionUser } = require('../middleware/UserMiddleware')
const {uploadOption} = require('../utils/fileUpload')

const multer = require('multer')
const mulParse = multer()

//ADD PRODUCT
router.post('/', uploadOption.single('gambar_gallery'), authMiddleware, addGallery)

//GET ALL GALLERY
router.get('/', getAllGallery)

//GET GALLERY BY ID
router.get('/:id', getGalleryById)

//UPDATE GALLERY
router.put('/:id', uploadOption.single('gambar_gallery'), updateGallery)

//DELETE GALLERY
router.delete('/:id', deleteGallery)

module.exports = router;