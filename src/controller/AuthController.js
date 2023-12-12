const {user} = require('../../models')
const jwt = require('jsonwebtoken')
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id)

    const cookieOption = {
        expire: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        status: 'Success',
        data: {
            user
        }
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

        // const token = signToken(newUser.id)

        // return res.status(201).json({
        //     message: 'Berhasil registrasi',
        //     token,
        //     data: newUser
        // })

        createSendToken(newUser, 201, res)
    } catch (error) {
        // return res.status(400).json({
        //     message: 'Validasi Error',
        //     error: error.errors.map(err => err.message)
        // })
        return res.status(400).json({
            message: 'Validasi Error',
            error: error && error.errors ? error.errors.map(err => err.message) : 'Unknown Error'
        });
        
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
    // const token = signToken(userData.id)
    // return res.status(200).json({
    //     status: 'Success',
    //     message: 'Login Berhasil',
    //     token
    // })

    createSendToken(userData, 200, res)
}

exports.logoutUser = async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message:'Logout berhasil'
    })
}

exports.getUserById = async(req, res) => {
    const currentUser = await user.findByPk(req.user.id)

    if(currentUser) {
        return res.status(200).json({
            id: currentUser.id,
            name: currentUser.name,
            handphone: currentUser.handphone,
            email: currentUser.email,
            alamat: currentUser.alamat
        })
    }

    return res.status(404).json({
        message: 'User not found'
    })
}

exports.getAllUser = async (req, res) => {
    const users = await user.findAll()

    return res.status(200).json({
        status: 'Success',
        data: users
    })
}