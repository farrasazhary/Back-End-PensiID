# Back-End-PensiID

TUTORIALS

*SERVER
1. clone repositori
2. install node module
3. running server "npm run start"

*DATABASE
1. buat database baru di phpMyAdmin dengan nama "pentas-seni"
2. import database jalankan melalui terminal dengan perintah (npx sequelize-cli db:migrate)

*CONSUME API LOCAL
1. (GALLERY)   : localhost:3000/gallery
 - judul
 - deskripsi
 - pencipta
 - tanggal_cipta
 - gambar_gallery

2. (KEGIATAN)  : localhost:3000/kegiatan
 - judul
 - description
 - alamat
 - tanggal
 - waktu
 - gambar_kegiatan

3. (USER)      
 - name
 - email
 - handphone
 - alamat
 - password

4. (REGISTER)   : localhost:3000/auth/register  "POST" 
5. (LOGIN)      : localhost:3000/auth/login     "POST"
6. (LOGOUT)     : localhost:3000/auth/logout    "DELETE"
