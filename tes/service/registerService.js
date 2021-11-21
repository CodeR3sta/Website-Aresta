const db = require('../configs/connectDB')
const bcryptjs = require('bcryptjs')
const transporter = require('../configs/transporterMail')

let createNewUser = (user) => {
    return new Promise(async(resolve,reject) => {
        try {
            // ceheck email exsist or not
            let cekEmail = await checkEmailUser(user.email)

            if(cekEmail){ // jika ketemu

                reject(`${user.email} sdh ada`)

            }else{

                // Make Usernmae
                let name = user.namaUtama
                let lowName = name.toLowerCase()
                let arr = lowName.split(' ')
                let tes = arr.join('_')
                // hash password
                let salt = bcryptjs.genSaltSync(10)

                // verify code
                let verify = Math.floor((Math.random() * 100000000000) + 1)

                let mailOption = {
                    from : 'kangcritical@gmail.com',
                    to : 'idontwannabe3000@gmail.com',
                    subject : `Account Verification`,
                    html : `<h1>Halo Peserta ARESTA 17</h1><br><hr>
                    <p>kami dari panitia ARESTA17 ingin gk tau ngapain</p>
                    <a href="http://localhost:3000/verification/?verify=${verify}">KLIK DI SINI UNTUK KONFIRMASI AKUN</a>`
                }

                let data = {
                    username : tes,
                    phone : user.phone,
                    email : user.email,
                    password : bcryptjs.hashSync(user.password,salt),
                    status : 0,
                    sekolah : user.sekolah,
                    tingkat : user.tingkat,
                    lomba : user.lomba,
                    kategori : user.kategori, 
                    registered : new Date().toLocaleString(),   
                    verification : verify,       
                    namaUtama : user.namaUtama,
                    jumlahAnggota : user.jumlahAnggota,
                    anggota1 : user.anggota1,
                    anggota2 : user.anggota2,
                    anggota3 : user.anggota3,
                    anggota4 : user.anggota4,
                    anggota5 : user.anggota5,
                    anggota6 : user.anggota6,
                    anggota7 : user.anggota7,
                    anggota8 : user.anggota8,
                    anggota9 : user.anggota9,
                    anggota10 : user.anggota10,
                    anggota11 : user.anggota11,
                    anggota12 : user.anggota12,
                    anggota13 : user.anggota13,
                    anggota14 : user.anggota14,
                    anggota15 : user.anggota15,
                    anggota16 : user.anggota16,
                    anggota17 : user.anggota17,
                    anggota18 : user.anggota18,
                    anggota19 : user.anggota19,
                    anggota20 : user.anggota20,
                    anggota21 : user.anggota21,
                    anggota22 : user.anggota22,
                    anggota23 : user.anggota23,
                    anggota24 : user.anggota24,

                }

                db.query('INSERT INTO users set ?',data,(error,row) => {
                    if (error) {
                        reject('GAGAL Daftar, Silahkan Daftar Kembali')
                    }

                    transporter.sendMail(mailOption,(err, info) => {
                        if (err) {
                            console.log('gagal kirim email', err)
                            db.query(`DELETE FROM users WHERE email = '${user.email}'`)
                            reject('GAGAL mengirim email konfirmasi, Silahkan Daftar Kembali')
                        }else{
                            resolve()
                        }

                    })
                })
            }
        } catch (e) {
            reject('GAGAL Daftar, Silahkan Daftar Kembali')
        }
    })
}

let checkEmailUser = (email) => {
    return new Promise((resolve,reject) => {
        try {
            db.query('SELECT * FROM users WHERE email = ?',[email],(error,row)=>{
                if(error) reject(error)

                if(row.length > 0){
                    resolve(true) // ketemu
                }else{
                    resolve(false) // kgk nemu
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewUser
}