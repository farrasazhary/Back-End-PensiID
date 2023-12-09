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
})
exports.deleteKegiatan = async (req, res) => {

        const id = req.params.id
        const idKegiatan = await kegiatan.findByPk(id)

        if(!idKegiatan) {
            return res.status(404).json({
                status: 'Fail',
                error: 'Id tidak ditemukan'
            })
        }

        await kegiatan.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            status: 'Success',
            message: `Data dengan ID ${id} berhasil dihapus`
        })
}