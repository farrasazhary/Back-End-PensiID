const asyncHandler = require('../middleware/asyncHandle')
const {gallery} = require('../../models')
const fs = require('fs')

exports.addGallery = asyncHandler(async (req, res) => {
    const {judul, deskripsi, pencipta, tanggal_cipta} = req.body

    const file = req.file;
    // validasi jika input file tidak ada
    if(!file) {
        res.status(400)
        throw new Error('Tidak ada file image yang diinput')
    }

    const fileName = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

    const newGallery = await gallery.create({
        judul,
        deskripsi,
        pencipta,
        tanggal_cipta,
        gambar_gallery: pathFile
    })

    return res.status(200).json({
        data: newGallery
    })

})

exports.getAllGallery = asyncHandler(async (req, res) => {
    const galleries = await gallery.findAll()

    return res.status(200).json({
        status: 'Success',
        data: galleries
    })
})

exports.getGalleryById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const galleryData = await gallery.findByPk(id);

    if(!galleryData) {
        res.status(404)
        throw new Error('Gallery ID tidak ditemukan')
    }

    return res.status(200).json({
        data: galleryData
    })
})

exports.updateGallery = asyncHandler(async(req, res) => {
    //req params & body
    const idParams = req.params.id
    const {judul, deskripsi, pencipta, tanggal_cipta} = req.body

    //get data by id
    const galleryData = await gallery.findByPk(idParams);

    //konsisi ketika id tidak ditemukan
    if(!galleryData) {
        res.status(404)
        throw new Error('Gallery ID tidak ditemukan')
    }

    //req file
    const file = req.file

    //kondisi jika file diubah
    if(file){
        //ambil file gambar lama
        const nameImage = galleryData.gambar_gallery.replace(`${req.protocol}://${req.get('host')}/public/uploads/`,'')

        //tempat file gambar lama
        const filePath = `src/public/uploads/${nameImage}`

        //fungsi hapus
        fs.unlink(filePath, (err) => {
            if(err){
                res.status(400)
                throw new Error('File tidak ditemukan')
            }
        })

        const fileName = file.filename
        const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`
        galleryData.gambar_gallery = pathFile
    }

    galleryData.judul = judul || galleryData.judul
    galleryData.deskripsi = deskripsi || galleryData.deskripsi
    galleryData.pencipta = pencipta || galleryData.pencipta
    galleryData.tanggal_cipta = tanggal_cipta || galleryData.tanggal_cipta

    galleryData.save();

    return res.status(200).json({
        message: 'Berhasil Update Gallery',
        data: galleryData
    })

})

exports.deleteGallery = asyncHandler(async(req, res) => {
    const idParams = req.params.id
    const galleryData = await gallery.findByPk(idParams)

    if(galleryData) {
        //ambil file gambar lama
        const nameImage = galleryData.gambar_gallery.replace(`${req.protocol}://${req.get('host')}/public/uploads/`,'')
        //tempat file gambar lama
        const filePath = `src/public/uploads/${nameImage}`

        //fungsi hapus
        fs.unlink(filePath, (err) => {
            if(err){
                res.status(400)
                throw new Error('File tidak ditemukan')
            }
        })
        galleryData.destroy()
        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })
    } else {
        res.status(404);
        throw new Error('Gallery ID tidak ditemukan')
    }
})