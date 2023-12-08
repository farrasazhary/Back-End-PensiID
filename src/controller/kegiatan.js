const { kegiatan } = require('../../models')
const asyncHandle = require('../middleware/asyncHandle')

exports.getAllKegiatan = async (req, res) => {
    try {
        const kegiatans = await kegiatan.findAll();

        return res.status(200).json({
            status: 'Success',
            data: kegiatans
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server down'
        })
    }
}

exports.getKegiatanById = async (req, res) => {
    
    try {
        const id = req.params.id
        const detailKegiatan = await kegiatan.findByPk(id);

        if(!detailKegiatan) {
            return res.status(404).json({
                status: 'Fail',
                error: 'Data id tidak ditemukan'
            })
        }

        return res.status(200).json({
            status: 'Success',
            data: detailKegiatan
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server down'
        })
    }
}

exports.createKegiatan = asyncHandle (async (req, res) => {
    

        const {judul, description, alamat, tanggal, waktu} = req.body;
        const newKegiatan = await kegiatan.create({
            judul,
            description,
            alamat,
            tanggal,
            waktu
        })

        res.status(201).json({
            status: 'Success',
            data: newKegiatan
        })

})

exports.updateKegiatan = asyncHandle (async (req, res) => {

        const id = req.params.id
        await kegiatan.update(req.body, {
            where: {
                id: id
            }
        });
        const newKegiatan = await kegiatan.findByPk(id);

        if(!newKegiatan) {
            res.status(404);
            throw new Error('Kegiatan tidak ditemukan')
        }

        // if(!newKegiatan) {
        //     return res.status(404).json({
        //         status: 'Fail',
        //         error: 'Data id tidak ditemukan'
        //     })
        // }

        return res.status(200).json({
            status: 'Success',
            data: newKegiatan   
        })
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