const { check } = require("express-validator");

let validateRegister = [
  check(
    "phone",
    "isi kolom nomor hp dgn angka saja dan tdk lebih dari 15 angka"
  )
    .isNumeric()
    .isLength({ max: 15, min: 8 }),
  check("email", "Invalid Email").isEmail().trim(),

  check(
    "password",
    "password minimal 8 karakter & memliki huruf kecil & huruf besar & angka"
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),

  check("passwordConfirm", "password tidak cocok").custom((value, { req }) => {
    return value === req.body.password;
  }),
  check(
    "asalSekolah",
    "isi kolom asal sekolah dgn huruf atau angka saja"
  ).matches(/^[0-9a-zA-Z ]+$/),
  check("namaUtama", "isi kolom nama ketua dgn huruf saja").matches(
    /^[A-Za-z\s]+$/
  ),
  // check ANGGOTA
];

let validateAdminLogin = [
  check("username", "invalid username").matches(/^[0-9a-zA-Z ]+$/),
];

let validateLogin = [
  check("email", "Invalid Email").isEmail().trim(),
  check("password", "email atau password salah").matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
  ),
];

let validateForgotPass = [check("email", "Invalid Email").isEmail().trim()];

let validateResetPass = [
  check(
    "password",
    "password minimal 8 karakter & memliki huruf kecil & huruf besar & angka"
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),

  check("passwordConfirm", "password tidak cocok").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateAdminLogin,
  validateForgotPass,
  validateResetPass,
};
