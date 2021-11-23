const db = require('../configs/connectDB')
const transporter = require('../configs/transporterMail')
const jwt = require("jsonwebtoken");
require('dotenv').config()

let getForgot = (req,res) => {
    return res.render('forgetPass', {
        hal : 'forgot',
        msgForgot : req.flash('msgForgot')
    })
}

let postForget = (req,res) => {
// amanin kolom input
    const email = req.body.email
    db.query('SELECT * FROM users WHERE email = ?',[email],(err,result) => {
        if (err) {
            console.log(err)
            return res.status(404).send(`<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;">error</h1>`)
        }else{

            if (result[0].status === 0) {
                req.flash('msgForgot','Akun belum di verifikasi')
                return res.redirect('/forgot-password')            }

            if (result.length > 0) {

                let token = jwt.sign(
                    {email : result[0].email, id : result[0].id},
                    process.env.TOKEN_FORGOTPASS,
                    {expiresIn : '10m'}
                )

                let mailOption = {
                    from : process.env.MAIL,
                    to : `${req.body.email}`,
                    subject : `Account Verification`,
                    html : `<h1>Halo Peserta ARESTA 17</h1><br><hr>
                    <p>kami dari panitia ARESTA17 ingin gk tau ngapain</p>
                    <a href="http://localhost:3000/reset-password/?verify=${token}">KLIK DI SINI UNTUK KONFIRMASI AKUN</a>`
                }

                transporter.sendMail(mailOption,(err, info) => {
                    if (err) {
                        console.log(err)
                        return res.status(404).send(`<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;">error</h1>`)
                    }else{
                        console.log(info)

                        return res.send(`<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: #0db02b;color:white;text-align:center;border-radius:10px;">pesan berhasil dikirim ke email anda</h1>`)

                    }
                })

            }else{
                req.flash('msgForgot','email tidak ditemukan')
                return res.redirect('/forgot-password')
            }
        }
    })
}

let getReset = (req,res) => {
    if (!req.query['verify']) return res.status(404).send('Page Not Found')

    let tokenAmbil = req.query['verify']
    try {
        const validToken = jwt.verify(tokenAmbil,process.env.TOKEN_FORGOTPASS)        
        if (validToken) {
            return res.render('forgetPass',{hal : 'reset'})
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send('Page Not Found')    
    }
}

let postReset = (req,res) => {
// amanin kolom input
    let ambil = req.query['verify']
    const data = jwt.verify(ambil,process.env.TOKEN_FORGOTPASS)
// ubah password
}

module.exports = {getForgot,getReset,postForget,postReset}