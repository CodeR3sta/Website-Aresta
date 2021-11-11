const { Router } = require("express")
const express = require("express")
const router = express.Router()
const passport = require('passport')
const registerController = require("../controllers/registerController")
const authValidation = require('../auth/authValidation')
const initPassportLocal = require('../controllers/passportLocalController')
const homeController = require('../controllers/homeController')
const loginController = require('../controllers/loginController')
const usersController = require('../controllers/usersController')

initPassportLocal()

let initWebRoutes = (app) => {

    //HOME PAGE
    router.get('/',loginController.checkLoggedOut, homeController.getHomePage)

    //USERS PAGE
    router.get('/users',loginController.checkLoggedIn, usersController.getUsersPage)
    router.post('/users',usersController.submitTahap2)
    router.post('/logout', loginController.postLogOut)

    // LOGIN 
    router.get('/login', loginController.checkLoggedOut, loginController.getLoginPage )
    router.post('/login', passport.authenticate('local', {
        successRedirect : '/users',
        failureRedirect : '/login',
        successFlash : true,
        failureFlash : true
    }))

    // REGISTERs
    router.get('/register', loginController.checkLoggedOut,registerController.registerGet)
    router.post('/register',authValidation.validateRegister, registerController.createNewUser)
    
    router.use('/', (req, res) => {
        res.status(404)
        res.send(`NOT FOUND`)
    })

    return app.use('/', router)

}



module.exports = initWebRoutes
