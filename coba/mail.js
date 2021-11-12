const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kangcritical@gmail.com',
        pass: 'Critical123'
    }
});

let mailOptions = {
    from: 'kangcritical@gmail.com',
    to: 'idontwannabe3000@gmail.com',
    subject: 'Sending Email using Nodejs',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});