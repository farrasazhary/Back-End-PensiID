const asyncHandler = require('../middleware/asyncHandle')
const { kegiatan } = require('../../models')
const fs = require('fs')

exports.createKegiatan = asyncHandler(async (req, res) => {
    const {judul, description, alamat, tanggal, waktu} = req.body;

    const file = req.file;
    //validasi jika input tidak ada
    if(!file) {
        res.status(400)
        throw new Error('Tidak ada file image yang diinput')
    }

    const fileName = file.filename
    const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`

    const newKegiatan = await kegiatan.create({
        judul,
        description,
        alamat,
        tanggal,
        waktu,
        gambar_kegiatan: pathFile
    })

    return res.status(200).json({
        status: 'Success',
        data: newKegiatan
    })
})


exports.getAllKegiatan = asyncHandler(async (req, res) => {
        const kegiatans = await kegiatan.findAll();

        return res.status(200).json({
            status: 'Success get all datas',
            data: kegiatans
        })
})

exports.getKegiatanById = asyncHandler(async (req, res) => {
        const id = req.params.id
        const detailKegiatan = await kegiatan.findByPk(id);

        if(!detailKegiatan) {
            res.status(404)
            throw new Error('Kegiatan ID tidak ditemukan')
        }

        return res.status(200).json({
            status: 'Success get kegiatan by ID',
            data: detailKegiatan
        })
})

exports.updateKegiatan = asyncHandler (async (req, res) => {
        //req params & body
        const idParams = req.params.id
        const {judul, description, alamat, tanggal, waktu} = req.body; 

        const detailKegiatan = await kegiatan.findByPk(idParams);

        if(!detailKegiatan) {
            res.status(404)
            throw new Error('Kegiatan ID tidak ditemukan')
        }

        const file = req.file

        if(file) {
            const nameImage = detailKegiatan.gambar_kegiatan.replace(`${req.protocol}://${req.get('host')}/public/uploads/`,'')

            const filePath = `src/public/uploads/${nameImage}`

            fs.unlink(filePath, (err) => {
                if(err){
                    res.status(400)
                    throw new Error('File tidak ditemukan')
                }
            })

            const fileName = file.filename
            const pathFile = `${req.protocol}://${req.get('host')}/public/uploads/${fileName}`
            detailKegiatan.gambar_kegiatan = pathFile
        }

        detailKegiatan.judul = judul || detailKegiatan.judul
        detailKegiatan.description = description || detailKegiatan.description
        detailKegiatan.alamat = alamat || detailKegiatan.alama
        detailKegiatan.tanggal = tanggal || detailKegiatan.tanggal
        detailKegiatan.waktu = waktu || detailKegiatan.waktu

        detailKegiatan.save();

        return res.status(200).json({
            message: 'berhasil update kegiatan',
            data: detailKegiatan
        })
})
exports.deleteKegiatan = asyncHandler (async (req, res) => {

    const idParams = req.params.id
    const detailKegiatan = await kegiatan.findByPk(idParams)

    if(detailKegiatan) {
        //ambil file gambar lama
        const nameImage = detailKegiatan.gambar_kegiatan.replace(`${req.protocol}://${req.get('host')}/public/uploads/`,'')
        //tempat file gambar lama
        const filePath = `src/public/uploads/${nameImage}`

        //fungsi hapus
        fs.unlink(filePath, (err) => {
            if(err){
                res.status(400)
                throw new Error('File tidak ditemukan')
            }
        })
        detailKegiatan.destroy()
        return res.status(200).json({
            message: 'Data berhasil dihapus'
        })
    } else {
        res.status(404);
        throw new Error('Kegiatan ID tidak ditemukan')
    }
})