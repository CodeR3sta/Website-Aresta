const { Router } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const registerController = require("../controllers/registerController");
const authValidation = require("../auth/authValidation");
const initPassportLocal = require("../controllers/passportLocalController");
const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController");
const usersController = require("../controllers/usersController");
const adminController = require("../admin/adminController");
const forgotPassController = require("../controllers/forgotPassword");

const adminLogin = require("../admin/adminLogin");
const { validateToken } = require("../admin/JWT");

initPassportLocal();

let initWebRoutes = (app) => {
  //HOME PAGE
  router.get("/", loginController.checkLoggedOut, (req, res) => {
    return res.render("home");
  });
  router.get("/ketentuan-umum", loginController.checkLoggedOut, (req, res) => {
    res.render("ku");
  });
  // router.get("/merchandise");
  // router.get('/jadwal-acara')

  //USERS PAGE //CLEAR --- //SERTIFIKAT
  router.get(
    "/users",
    loginController.checkLoggedIn,
    usersController.getUsersPage
  );
  router.post("/users/:data", usersController.submitTahap2);
  router.post("/logout", loginController.postLogOut); //Logout

  // REGISTER USERS //CLEAR
  router.get(
    "/register",
    loginController.checkLoggedOut,
    registerController.registerGet
  );
  router.post(
    "/register",
    authValidation.validateRegister,
    registerController.createNewUser
  ); // Buat Akun & kirim Verifikasi email
  router.get("/verification", registerController.verifikasiEmail); // Verifikasi email

  // LOGIN USERS//CLEAR
  router.get(
    "/login",
    loginController.checkLoggedOut,
    loginController.getLoginPage
  );
  router.post(
    "/login",
    authValidation.validateLogin,
    loginController.loginValidate,
    passport.authenticate("local-user", {
      successRedirect: "/users",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true,
    })
  );

  //FORGOT PASSWORD
  router.get("/forgot-password", forgotPassController.getForgot);
  router.post(
    "/forgot-password",
    authValidation.validateForgotPass,
    forgotPassController.postForget
  );
  router.get("/reset-password/", forgotPassController.getReset);
  router.post(
    "/reset-password",
    authValidation.validateResetPass,
    forgotPassController.postReset
  );

  // ADMIN

  // ADMIN REGISTER //CLEAR
  const regis = require("../admin/register");
  router.get("/adreg", (req, res) => {
    res.render("adminRegis");
  });
  router.post("/adreg", regis.reg);

  // ADMIN LOGIN //CLEAR --- CHALLENGE 3KALI
  app.get("/code/resta/panitia/login", adminLogin.getLogin);
  app.post(
    "/code/resta/panitia/login",
    authValidation.validateAdminLogin,
    adminLogin.postLogin
  );
  app.post("/code/resta/panitia/logout", adminLogin.logout);

  // ADMIN PAGE //CLEAR
  router.get(
    "/code/resta/panitia/users",
    validateToken,
    adminController.viewStatus
  ); // get
  router.post(
    "/code/resta/panitia/users",
    validateToken,
    adminController.findUsers
  ); // search engine

  // VIEW USERS DATA //CLEAR
  router.get(
    "/code/resta/panitia/users/views/:id",
    validateToken,
    adminController.viewUsers
  ); // lihat users data

  // VIEW IMAGE DATA //CLEAR
  router.get(
    "/code/resta/panitia/users/gambar/:username/:sekolah/:gambar",
    validateToken,
    adminController.usersImage
  );

  // DELETE USERS //CLEAR
  router.post(
    "/code/resta/panitia/users/delete/:id",
    validateToken,
    adminController.deleteUsers
  ); // delete users page

  // KONFIRMASI TAHAP 2 & 3 //CLEAR
  router.post(
    "/code/resta/panitia/users/konfirmasi/tahap2/:id",
    validateToken,
    adminController.confirmTahap2
  );
  router.post(
    "/code/resta/panitia/users/konfirmasi/tahap3/:id",
    validateToken,
    adminController.confirmTahap3
  );

  return app.use("/", router);
};
module.exports = { initWebRoutes };
