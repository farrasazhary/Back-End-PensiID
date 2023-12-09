const {user} = require('../../models')
const jwt = require('jsonwebtoken')
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECTRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}

exports.registerUser = async(req, res) => {
    try {
        // if(password != passwordConfirm) {
        //     return res.status(400).json({
        //         message: 'Password dan PasswordConfirm tidak sama'
        //     })
        // }

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            handphone: req.body.handphone,
            alamat:'-',
            password: req.body.password
        })

        const token = signToken(newUser.id)

        return res.status(201).json({
            message: 'Berhasil registrasi',
            token,
            data: newUser
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Validasi Error',
            error: error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async(req, res) => {
    // fungsi validasi
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Error Validasi',
            error: 'Please input email/password'
        })
    }

    //cek jika data sudah benar
    const userData = await user.findOne({where: {email: req.body.email}})

    if(!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Error Login',
            error: 'Invalid Email or Password'
        })
    }

    //tampil token ketika berhasil login
    const token = signToken(userData.id)
    return res.status(200).json({
        status: 'Success',
        message: 'Login Berhasil',
        token
    })
}