const express = require('express');
const router = express.Router();
const { getAllKegiatan, createKegiatan, getKegiatanById, updateKegiatan, deleteKegiatan } = require('../controller/kegiatan');
const { authMiddleware,permissionUser } = require('../middleware/UserMiddleware')
const { uploadOption } = require('../utils/fileUpload')

const multer = require('multer')
const mulParse = multer()

//READ DATA
router.get('/', getAllKegiatan);

//READ DATA BY ID
router.get('/:id', getKegiatanById)

//CREATE DATA
router.post('/', uploadOption.single('gambar_kegiatan'), authMiddleware, createKegiatan);

//UPDATE DATA
router.put('/:id', uploadOption.single('gambar_kegiatan'), updateKegiatan);

//DELETE DATA
router.delete('/:id', authMiddleware, deleteKegiatan);

module.exports = router;