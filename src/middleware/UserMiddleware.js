const jwt = require('jsonwebtoken')
const { user } = require('../../models')

exports.authMiddleware = async (req, res, next) => {
    //fungsi jika pada header kita masukkan token atau tidak
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
        return next(res.status(401).json({
            status: 401,
            message: 'anda belum login/register, token tidak ditemukan'
        }))
    }

    // console.log(token)
    //decode verifikasi token
    let decoded
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(res.status(401).json({
            errro: error,
            message: 'Token yang dimasukkan tidak ditemukan/tidak ada'
        }))
    }

    //ambil data user berdasarkan kondisi decode
    const currentUser = await user.findByPk(decoded.id)
    if(!currentUser) {
        return next(res.status(401).json({
            status: 401,
            message: 'User sudah terhapus, token sudah tidak bisa digunakan'
        }))
    }
    // console.log(currentUsser);

    req.user = currentUser;

    next()
}

// exports.permissionUser = (...roles) => {
//     return async(req, res, next) => {
//         const rolesData = await roles.findByPk(req.user.role_id)

//         const roleName = rolesData.name

//         if(!roleName.includes(roleName)){
//             return next(res.status(403).json({
//                 status: 403,
//                 error: 'Anda tidak dapat mengakses halaman ini'
//             }))
//         }
//         next()
//     }
// }

// exports.permissionUser = (...allowedRoles) => {
//     return async (req, res, next) => {
//         try {
//             // Asumsikan req.user.role_id adalah ID peran untuk pengguna saat ini
//             const userRole = await roles.findByPk(req.user.role_id);

//             if (!userRole) {
//                 return res.status(403).json({
//                     status: 403,
//                     error: 'Peran pengguna tidak ditemukan'
//                 });
//             }

//             const roleName = userRole.name;

//             if (!allowedRoles.includes(roleName)) {
//                 return res.status(403).json({
//                     status: 403,
//                     error: 'Anda tidak dapat mengakses halaman ini'
//                 });
//             }

//             next();
//         } catch (error) {
//             return res.status(500).json({
//                 status: 500,
//                 error: 'Kesalahan Internal Server'
//             });
//         }
//     };
// };