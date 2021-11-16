const db = require('../configs/connectDB')
const bcryptjs = require('bcryptjs')

let reg = (req, res) => {
    let salt = bcryptjs.genSaltSync(10)

    let data = {
        email: req.body.email,
        password : bcryptjs.hashSync(req.body.password,salt),
    }

    db.query('INSERT INTO admin set ?',data,(error,row) => {
        if (error) {
            reject(error)
        }
    })
}

module.exports = {
    reg
}