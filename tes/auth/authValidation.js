const {check} = require('express-validator')

let validateRegister = [
    check('phone','isi kolom phone number dgn angka saja dan tdk lebih dari 15 angka').isNumeric().isLength({max:15,min:8}),
    check('email','Invalid Email').isEmail().trim(),

    check('password','password minimal 8 karakter & memliki huruf kecil & huruf besar & angka').isLength({min: 8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),

    check('passwordConfirm','password tidak cocok').custom((value,{req}) => {
        return value === req.body.password
    }),
    check('asalSekolah','isi kolom asal sekolah dgn text atau angka saja').matches(/^[0-9a-zA-Z ]+$/),
    check('namaUtama','isi kolom nama ketua dgn text saja').matches(/^[A-Za-z\s]+$/),
    // check ANGGOTA
]

module.exports = {
    validateRegister
}