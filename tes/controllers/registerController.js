const {validationResult} = require("express-validator")
const registerService = require('../service/registerService')

let registerGet = (req,res) => {res.render('register',{
    message : req.flash('msg')
})}

let createNewUser = async (req,res) => {
    // validate all required fields
    let errorsArr = []
    let validationErr = validationResult(req)
    if(!validationErr.isEmpty()){
        let errors = Object.values(validationErr.mapped())
        errors.forEach((item) => {
            errorsArr.push(item.msg)
        })
        req.flash('msg', errorsArr)
        return res.redirect('/register')
    }

    try {

        let newUser = {
            phone : req.body.phone,
            email : req.body.email,
            password : req.body.password,
            sekolah : req.body.asalSekolah,
            tingkat : req.body.sekolah,
            lomba : req.body.lomba,
            kategori : req.body.kelompok,
    
            namaUtama : req.body.namaUtama,
            anggota1 : cekNamaAnggota(req.body.namaAnggota1),
            anggota2 : cekNamaAnggota(req.body.namaAnggota2),
            anggota3 : cekNamaAnggota(req.body.namaAnggota3),
            anggota4 : cekNamaAnggota(req.body.namaAnggota4),
            anggota5 : cekNamaAnggota(req.body.namaAnggota5),
    

        }

        let chat = await registerService.createNewUser(newUser)
        req.flash('msg', chat)
        return res.redirect('/login')

    } catch (e) {
        req.flash('msg', e)
        return res.redirect('/register')
    }

}

let cekNamaAnggota = (nama) => {
    if(nama === undefined){
        nama = ''
        return nama
    }else{
        return nama
    }
}

module.exports = {
    registerGet,
    createNewUser
}
