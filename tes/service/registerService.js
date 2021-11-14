const db = require('../configs/connectDB')
const bcryptjs = require('bcryptjs')

let createNewUser = (user) => {
    return new Promise(async(resolve,reject) => {
        try {
            // ceheck email exsist or not
            let cekEmail = await checkEmailUser(user.email)

            if(cekEmail){ // jika ketemu
                reject(`${user.email} sdh ada`)
            }else{
                let name = user.namaUtama
                let lowName = name.toLowerCase()
                let arr = lowName.split(' ')
                let tes = arr.join('_')
                // hash password
                let salt = bcryptjs.genSaltSync(10)
                let data = {
                    username : tes,
                    phone : user.phone,
                    email : user.email,
                    password : bcryptjs.hashSync(user.password,salt),
                    status : 1,
                    pdfStatus : false,
                    sekolah : user.sekolah,
                    tingkat : user.tingkat,
                    lomba : user.lomba,
                    kategori : user.kategori,           
                    namaUtama : user.namaUtama,
                    anggota1 : user.anggota1,
                    anggota2 : user.anggota2,
                    anggota3 : user.anggota3,
                    anggota4 : user.anggota4,
                    anggota5 : user.anggota5,
                }

                db.query('INSERT INTO users set ?',data,(error,row) => {
                    if (error) {
                        reject(error)
                    }
                    resolve("Sucsess register")
                })
            }
        } catch (e) {
            reject(e)
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