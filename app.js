require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT;

const KegiatanRoutes = require('./src/routes/kegiatan')
const GalleryRoutes = require('./src/routes/gallery')
const AuthRoutes = require('./src/routes/AuthRouter')

const morgan = require('morgan')

const cookieParse = require('cookie-parser')
const {errorHandler, notFound} = require('./src/middleware/errorMiddleware')
const path = require('path')

//Midleware
app.use(express.json())
app.use(cookieParse())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/public/uploads', express.static(path.join(__dirname, 'src/public/uploads')))

//Routing
// app.use('/', KegiatanRoutes)
app.use('/kegiatan', KegiatanRoutes)
app.use('/gallery', GalleryRoutes)
app.use('/auth', AuthRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di ${PORT}`)
})