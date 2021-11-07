const { Router } = require("express")
const express = require("express")
const router = express.Router()
const passport = require('passport')
const registerController = require("../controllers/registerController")
const authValidation = require('../auth/authValidation')
const initPassportLocal = require('../controllers/passportLocalController')
const homePageController = require('../controllers/homeController')
const loginController = require('../controllers/loginController')

initPassportLocal()

let initWebRoutes = (app) => {

    //HOME PAGE
    router.get('/', loginController.checkLoggedIn , homePageController.getHomePage)
    router.post('/logout', loginController.postLogOut)

    // LOGIN 
    router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage )
    router.post('/login', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/login',
        successFlash : true,
        failureFlash : true
    }))

    // REGISTER
    router.get('/register', registerController.registerGet)
    router.post('/register',authValidation.validateRegister, registerController.createNewUser)
    
    return app.use('/', router)

}



module.exports = initWebRoutes
