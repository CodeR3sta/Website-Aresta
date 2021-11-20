const {mkdir} = require('fs')
const db = require('../configs/connectDB')
const path = require('path')

let getUsersPage = (req, res) => {res.render('users',{
    user : req.user,
    anggota : [
        req.user.anggota1,
        req.user.anggota2,
        req.user.anggota3,
        req.user.anggota4,
        req.user.anggota5,
        req.user.anggota6,
        req.user.anggota7,
        req.user.anggota8,
        req.user.anggota9,
        req.user.anggota10,
        req.user.anggota11,
        req.user.anggota12,
        req.user.anggota13,
        req.user.anggota14,
        req.user.anggota15,
        req.user.anggota16,
        req.user.anggota17,
        req.user.anggota18,
        req.user.anggota19,
        req.user.anggota20,
        req.user.anggota21,
        req.user.anggota22,
        req.user.anggota23,
        req.user.anggota24
    ],
    pesan : req.flash('tahap2'),
    msg2 : req.flash('msg-2')
})}



let submitTahap2 = async (req,res) => {    

    // CEK ADA ISI ATAU TIDAK
    if (!req.files || Object.keys(req.files).length < 4 || Object.keys(req.files).length > 4) {
        req.flash('tahap2', 'isi')
        return res.redirect('users')
    }
    
    let object = req.files

    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            // CEK EXTENSI PNG JPG JPEG PDF ONLY
            if (element.mimetype === 'image/png' || element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'application/pdf') {
            }else{
                req.flash('tahap2','extensi')
                return res.redirect('users')
            }
            // CEK SIZE KURANG DARI 15MB
            if (element.size > 15000000) {
                req.flash('tahap2','ukuran')
                return res.redirect('users')
            }
        }
    }

    let pathUp = path.join(__dirname , `../upload/${req.user.sekolah}/${req.user.username}/`)
    // BUAT DIRECTORY 
    mkdir(pathUp,0o777,(err) => {
        if(err){
            console.log(err)
            req.flash('tahap2', 'gagal')
            return res.redirect('/users')
        } 

        let object = req.files
        let arr = []

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                arr.push(element.name)
            }
        }
        // HEX GAMBAR   
        let data = `status = 2,kis = '${arr[0]}',suratRekomendasi = '${arr[1]}',postIg = '${arr[2]}',fotoDiri='${arr[3]}'`
        db.query(`UPDATE users SET ${data} WHERE email = '${req.user.email}' `,(err,rows) => {
            if(err){
                console.log(err)
                req.flash('tahap2', 'gagal')
                return res.redirect('/users')
            } 

            return res.redirect('/users')
        })

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                // UPLOAD IMAGE TO DIRECTORY
                element.mv(pathUp + `${element.name}`, (err) => {
                    if(err){
                        console.log(err)
                        req.flash('tahap2', 'gagal')
                        return res.redirect('/users')
                    } 
                })
            }
        }
        
    })
    
       

}

module.exports ={
    getUsersPage,
    submitTahap2
}