const {validationResult} = require("express-validator")

let getLoginPage = (req,res) => {
    res.render('login', 
        {message : req.flash('msg')
    })
}

let loginValidate = (req,res,next) => {
        // validate all required fields
        let errorsArr = []
        let validationErr = validationResult(req)
        if(!validationErr.isEmpty()){
            let errors = Object.values(validationErr.mapped())
            errors.forEach((item) => {
                errorsArr.push(item.msg)
            })
            req.flash('msg', errorsArr)
            return res.redirect('/login')
        }
        next()
}

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users')
    }
    next()
}

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

let postLogOut = (req, res) => {
    req.session.destroy((err) => {
        return res.redirect('/login')
    })
}

module.exports = {
    getLoginPage,
    checkLoggedOut,
    checkLoggedIn,
    postLogOut,
    loginValidate
}