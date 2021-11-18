const db = require('../configs/connectDB')

// HOME status 1, 2, 3, 4
let viewStatus = (req,res) => {
    console.log(req.user)
    db.query('SELECT * FROM users', (err, row) => {
        if(err) console.log(err)
        
        let row1 = []
        let row2 = []
        let row3 = []
        let row4 = []

        row.forEach(ppp => {
            if (ppp.status === 1) {
                row1.push(ppp)
            }else if (ppp.status === 2) {
                row2.push(ppp)
            }else if (ppp.status === 3) {
                row3.push(ppp)
            }else if (ppp.status === 4) {
                row4.push(ppp)
            }
        });

        return res.render('admin',{row,row1,row2,row3,row4})

    })
}

// FIND USERS
let findUsers = (req,res) => {
    let cari = req.body.search
    db.query('SELECT * FROM users WHERE namaUtama LIKE ?',['%'+ cari +'%'],(err, results) => {
        if(err) console.log(err)

        return res.render('admin',{row:results, row1 : undefined, row2:undefined, row3:undefined,row4 : undefined})
    })
}

// DELETE USERS
let deleteUsers = (req, res) => {
    db.query('DELETE FROM users WHERE id = ?',[req.params.id],(err, results) => {
        if(err){
            console.log(err)
        }else{
            return res.redirect('/code/resta/panitia/users')
        }

    })
}

// VIEW USERS DATA
let viewUsers = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?',[req.params.id],(err, results) => {
        if(err) console.log(err)
        
        let obj = results[0]

        return res.render('cek',{
            obj,
            anggota: [
                obj.anggota1,
                obj.anggota2,
                obj.anggota3,
                obj.anggota4,
                obj.anggota5
            ]
        })
    })
}

// KONFRIMASI TAHAP 2
let confirmTahap2 = async(req, res) => {
    
    let user = await adminFind.findUser(req.body.username)
    if (!user) {
      return res.send('username salah')
    }

    if (user) {
        let match = await adminFind.comparePassword(user,req.body.password)

        if (match === true) {
            if (req.body.hasil === 'benar') {
                db.query('UPDATE users SET status = 3 WHERE id = ?',[req.params.id],(err, results) => {
                    if(err) console.log(err)
                    return res.redirect('/code/resta/panitia/users')
                })
            }else{
                let pesan = req.body.pesan
                db.query(`UPDATE users SET status = 1, pesan = '${pesan}' WHERE id = ?`,[req.params.id],(err, results) => {
                    if(err)console.log(err)
                    // hapus directory
                    return res.redirect('/code/resta/panitia/users')
                })
            }
        }else{
            return res.send('Password Salah')
        }
    }

}

// KONFIRMASI TAHAP 3 / PEMBAYARAN
let confirmTahap3 = (req, res) => {
    // Cek Password
    db.query('UPDATE users SET status = 4 WHERE id = ?',[req.params.id],(err, results) => {
        if(err) console.log(err)

        return res.redirect('/code/resta/panitia/users')
    })
}

// VIEW USERS IMAGE
let usersImage = (req, res) => {
    const a = `\\upload\\${req.params.username}\\${req.params.gambar}`
    return res.sendFile('C:\\Users\\ahmad naji\\Documents\\GitHub\\Website-Aresta\\tes' + a )
}






let findUser = (username) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(`SELECT * FROM admin WHERE username = '${username}'`, (error, rows) => {
                if(error) reject(error)
                let user = rows[0]
                resolve(user)
            })
        } catch (e) {
            reject(e)
        }
    })
  }
  
  let comparePassword = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if(isMatch) resolve(true)
            resolve('Username or Password Incorrect')
        } catch (e) {
            reject(e)
        }
    })
  }
                                                                                                                                          
module.exports = {
    viewStatus,
    findUsers,
    deleteUsers,
    viewUsers,
    confirmTahap2,
    confirmTahap3,
    usersImage
}