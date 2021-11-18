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
const adminController = require ('../admin/adminController')

const adminLogin = require('../admin/adminLogin')
const { validateToken } = require("../admin/JWT")

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
    router.post('/login', passport.authenticate('local-user', {
        successRedirect : '/users',
        failureRedirect : '/login',
        successFlash : true,
        failureFlash : true
    }))

    // REGISTERs
    router.get('/register', loginController.checkLoggedOut,registerController.registerGet)
    router.post('/register',authValidation.validateRegister, registerController.createNewUser)
    const regis = require('../admin/register')
    router.get('/adreg', (req, res) => {res.render('adminRegis')})
    router.post('/adreg',regis.reg)
    
    // ADMIN
    // ADMIN LOGIN
    app.get('/code/resta/panitia/login',adminLogin.getLogin )
    app.post("/code/resta/panitia/login",adminLogin.postLogin)
    // ADMIN PAGE
    router.get('/code/resta/panitia/users',validateToken,adminController.viewStatus) // get 
    router.post('/code/resta/panitia/users',validateToken,adminController.findUsers) // search engine
    // DELETE USERS
    router.get('/code/resta/panitia/users/delete/:id',validateToken,adminController.deleteUsers) // delete users page
    // VIEW USERS DATA
    router.get('/code/resta/panitia/users/views/:id',validateToken,adminController.viewUsers) // lihat users data
    // VIEW IMAGE DATA
    router.get('/code/resta/panitia/users/gambar/:username/:gambar',validateToken,adminController.usersImage)
    // KONFIRMASI TAHAP 2 & 3
    router.post('/code/resta/panitia/users/konfirmasi/tahap2/:id',validateToken,adminController.confirmTahap2)
    router.post('/code/resta/panitia/users/konfirmasi/tahap3/:id',validateToken,adminController.confirmTahap3)

    return app.use('/', router)

}
module.exports = {initWebRoutes}
