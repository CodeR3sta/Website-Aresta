const {mkdir} = require('fs')
const db = require('../configs/connectDB')

let getUsersPage = (req, res) => {res.render('users',{
    user : req.user,
    anggota : [
        req.user.anggota1,
        req.user.anggota2,
        req.user.anggota3,
        req.user.anggota4,
        req.user.anggota5
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

    let pathUp = `../tes/upload/${req.user.username}/`
    // BUAT DIRECTORY 
    mkdir(pathUp,0o777,(err) => {
        if(err){
            console.log(err)
            req.flash('tahap2', 'gagal')
            return res.redirect('users')
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
                return res.redirect('users')
            } 

            return res.redirect('users')
        })

        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                // UPLOAD IMAGE TO DIRECTORY
                element.mv(pathUp + `${element.name}`, (err) => {
                    if(err){
                        console.log(err)
                        req.flash('tahap2', 'gagal')
                        return res.redirect('users')
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