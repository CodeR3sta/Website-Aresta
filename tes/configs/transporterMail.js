const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
      user : 'kangcritical@gmail.com',
      pass : process.env.PASSMAIL
    }
})

module.exports = transporter