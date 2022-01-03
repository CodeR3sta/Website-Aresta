const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
      user : process.env.MAIL,
      pass : process.env.PASSMAIL
    }
})

module.exports = transporter