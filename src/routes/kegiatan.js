const express = require('express');
const { getAllKegiatan, createKegiatan, getKegiatanById, updateKegiatan, deleteKegiatan } = require('../controller/kegiatan');
const router = express.Router();

//READ DATA
router.get('/', getAllKegiatan);

//READ DATA BY ID
router.get('/:id', getKegiatanById)

//CREATE DATA
router.post('/', createKegiatan);

//UPDATE DATA
router.put('/:id', updateKegiatan);

//DELETE DATA
router.delete('/:id', deleteKegiatan);

module.exports = router;