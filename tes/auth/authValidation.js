const {check} = require('express-validator')

let validateRegister = [
    check('email','Invalid Email').isEmail().trim(),

    check('password','password minimal 8 karakter').isLength({min: 8}),

    check('passwordConfirm','password tidak cocok').custom((value,{req}) => {
        return value === req.body.password
    })
]

module.exports = {
    validateRegister
}