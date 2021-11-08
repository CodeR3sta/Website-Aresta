const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
    host : 'smtp.ethereal.email',
    port : 587,
    auth : {
        user : 'deborah.barton8@ethereal.email',
        pass : 'TQFS1Rd5t3cUs27bkc'
    }
})

async function run(){
    let 
}