const db = require('../configs/connectDB')
const bcryptjs = require('bcryptjs')

let reg = (req, res) => {
    let salt = bcryptjs.genSaltSync(10)

    let data = {
        username: req.body.username.toLowerCase(),
        password : bcryptjs.hashSync(req.body.password,salt),
        ubah : bcryptjs.hashSync(req.body.ubah,salt),
        hapus : bcryptjs.hashSync(req.body.hapus,salt)
    }

    db.query('INSERT INTO admin set ?',data,(error,row) => {
        if (error) {
            reject(error)
        }

        return res.redirect('/')
    })
}

module.exports = {
    reg
}