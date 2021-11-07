

let getLoginPage = (req,res) => {
    res.render('login', 
        {message : req.flash('msg')
    })
}

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
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
    postLogOut
}