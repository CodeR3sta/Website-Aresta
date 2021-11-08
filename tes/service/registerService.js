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
                // hash password
                let salt = bcryptjs.genSaltSync(10)
                let data = {
                    email : user.email,
                    password : bcryptjs.hashSync(user.password,salt)
                }

                db.query('INSERT INTO users set ?',data,(error,row) => {
                    if (error) {
                        reject(error)
                    }
                    console.log(row)
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