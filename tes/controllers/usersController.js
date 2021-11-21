const {mkdir, rmdirSync} = require('fs')
const db = require('../configs/connectDB')
<<<<<<< HEAD
<<<<<<< HEAD
const path = require('path')
const uuid = require('uuid')
const { rmdir } = require('fs/promises')
=======
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
=======
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051

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
    console.log(req.user)
    // CEK ADA ISI ATAU TIDAK
    if (!req.files) {
        req.flash('tahap2', 'isi')
        return res.redirect('users')
    }
    
    // MEMASUKKAN Object file ke dalam Variabel
    let fotoTim
    if (req.user.lomba === 'nasyid') {
        fotoTim = req.files['fotoTim']
    }
    let suratRekomendasi = req.files["suratRekomendasi"]
    let kis = []
    let postIg = []
    let fotoDiri = []
    for (let i = 1; i <= req.user.jumlahAnggota + 1; i++) {
        kis.push(req.files[`kis${i}`]) 
        postIg.push(req.files[`postIg${i}`])
        fotoDiri.push(req.files[`fotoDiri${i}`])       
    }

    //MENGE-CEK EXTENSI FILE DAN UKURAN
    if (suratRekomendasi.mimetype === 'image/png' || suratRekomendasi.mimetype === 'image/jpg' || suratRekomendasi.mimetype === 'image/jpeg' ) {
    }else{
        req.flash('tahap2','extensi')
        return res.redirect('users')
    } 
    if (suratRekomendasi.size > 20000000) {
        req.flash('tahap2','ukuran')
        return res.redirect('users')
    }
    if (req.user.lomba === 'nasyid') {
        if (fotoTim.mimetype === 'image/png' || fotoTim.mimetype === 'image/jpg' || fotoTim.mimetype === 'image/jpeg' ) {
        }else{
            req.flash('tahap2','extensi')
            return res.redirect('users')
        } 
        if (fotoTim.size > 20000000) {
            req.flash('tahap2','ukuran')
            return res.redirect('users')
        }
    }
    kis.forEach(element => {
        if (element.mimetype === 'image/png' || element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' ) {
        }else{
            req.flash('tahap2','extensi')
            return res.redirect('users')
        } 
        if (element.size > 20000000) {
            req.flash('tahap2','ukuran')
            return res.redirect('users')
        }
    });
    postIg.forEach(element => {
        if (element.mimetype === 'image/png' || element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' ) {
        }else{
            req.flash('tahap2','extensi')
            return res.redirect('users')
        } 
        if (element.size > 20000000) {
            req.flash('tahap2','ukuran')
            return res.redirect('users')
        }
    });
    fotoDiri.forEach(element => {
        if (element.mimetype === 'image/png' || element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' ) {
        }else{
            req.flash('tahap2','extensi')
            return res.redirect('users')
        } 
        if (element.size > 20000000) {
            req.flash('tahap2','ukuran')
            return res.redirect('users')
        }
    });

    // FOLDER PATH
    let pathUp = path.join(__dirname , `../upload/${req.user.username}/`)

<<<<<<< HEAD
<<<<<<< HEAD
=======
    let pathUp = `../tes/upload/${req.user.username}/`
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
=======
    let pathUp = `../tes/upload/${req.user.username}/`
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
    // BUAT DIRECTORY 
    mkdir(pathUp,0o777,(err) => {
        if(err){
            console.log(err)
            req.flash('tahap2', 'gagal')
<<<<<<< HEAD
<<<<<<< HEAD
            return res.redirect('/users')
        }
=======
=======
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
            return res.redirect('users')
        } 
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051

        // HEX IMAGE NAME
        if (suratRekomendasi.mimetype === 'image/png') {
            suratRekomendasi["name"] = uuid.v4() + '.png'
        }else if(suratRekomendasi === 'image/jpg'){
            suratRekomendasi["name"] = uuid.v4() + '.jpg'
        }else if (suratRekomendasi.mimetype === 'image/jpeg') {
            suratRekomendasi["name"] = uuid.v4() + '.jpeg'
        }

        if (req.user.lomba === 'nasyid') {
            if (fotoTim.mimetype === 'image/png') {
                fotoTim["name"] = uuid.v4() + '.png'
            }else if(fotoTim === 'image/jpg'){
                fotoTim["name"] = uuid.v4() + '.jpg'
            }else if (fotoTim.mimetype === 'image/jpeg') {
                fotoTim["name"] = uuid.v4() + '.jpeg'
            }
        }
<<<<<<< HEAD
<<<<<<< HEAD

        for (let i = 0; i < kis.length; i++) {
            if (kis[i].mimetype === 'image/png') {
                kis[i]["name"] = uuid.v4() + '.png'
            }else if(kis[i] === 'image/jpg'){
                kis[i]["name"] = uuid.v4() + '.jpg'
            }else if (kis[i].mimetype === 'image/jpeg') {
                kis[i]["name"] = uuid.v4() + '.jpeg'
            }
        }

        for (let i = 0; i < postIg.length; i++) {
            if (postIg[i].mimetype === 'image/png') {
                postIg[i]["name"] = uuid.v4() + '.png'
            }else if(postIg[i] === 'image/jpg'){
                postIg[i]["name"] = uuid.v4() + '.jpg'
            }else if (postIg[i].mimetype === 'image/jpeg') {
                postIg[i]["name"] = uuid.v4() + '.jpeg'
            }
        }

        for (let i = 0; i < fotoDiri.length; i++) {
            if (fotoDiri[i].mimetype === 'image/png') {
                fotoDiri[i]["name"] = uuid.v4() + '.png'
            }else if(fotoDiri[i] === 'image/jpg'){
                fotoDiri[i]["name"] = uuid.v4() + '.jpg'
            }else if (fotoDiri[i].mimetype === 'image/jpeg') {
                fotoDiri[i]["name"] = uuid.v4() + '.jpeg'
            }
        }
    
        console.log(kis)
        console.log(fotoDiri)
        console.log(postIg)
        console.log(suratRekomendasi)
        console.log(fotoTim)
    
        // UPLOAD IMAGE TO UPLOAD FOLDER
        suratRekomendasi.mv(pathUp + suratRekomendasi.name, (err) => {
            if(err){
                console.log(err)
                req.flash('tahap2', 'gagal')
                return res.redirect('/users')
            } 
        })

        if (req.user.lomba === 'nasyid') {
            fotoTim.mv(pathUp + fotoTim.name, (err) => {
                if(err){
                    console.log(err)
                    req.flash('tahap2', 'gagal')
                    return res.redirect('/users')
                } 
            })
        }

        kis.forEach(element => {
            element.mv(pathUp + `${element.name}`, (err) => {
                if(err){
                    console.log(err)
                    req.flash('tahap2', 'gagal')
                    return res.redirect('/users')
                } 
            })  
        });

        postIg.forEach(element => {
            element.mv(pathUp + `${element.name}`, (err) => {
                if(err){
                    console.log(err)
                    req.flash('tahap2', 'gagal')
                    return res.redirect('/users')
                } 
            })
        });

        fotoDiri.forEach(element => {
            element.mv(pathUp + `${element.name}`, (err) => {
                if(err){
                    console.log(err)
                    req.flash('tahap2', 'gagal')
                    return res.redirect('/users')
                } 
            })
        });

        // MEMASUKKAN IMAGE NAME KE ARRAY BARU
        let kisData = []
        let fotoDiriData = []
        let postIgData = []
        
        kis.forEach(element => {
            kisData.push(element.name)
        });

        fotoDiri.forEach(element => {
            fotoDiriData.push(element.name)
        });

        postIg.forEach(element => {
            postIgData.push(element.name)
        });

        let suratRekomendasiData = suratRekomendasi.name

        // INSERT ARRAY BARU KE DATABASE
        let data;
        if (req.user.lomba === 'nasyid') {
            data = `status = 2,kis = '${kisData}',suratRekomendasi = '${suratRekomendasiData}',fotoTim = '${fotoTim.name}',postIg = '${postIgData}',fotoDiri='${fotoDiriData}'`
        }else{
            data = `status = 2,kis = '${kisData}',suratRekomendasi = '${suratRekomendasiData}',postIg = '${postIgData}',fotoDiri='${fotoDiriData}'`
        }
=======
=======
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
        // HEX GAMBAR
        let data = `status = 2,kis = '${arr[0]}',suratRekomendasi = '${arr[1]}',postIg = '${arr[2]}',fotoDiri='${arr[3]}'`
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
        db.query(`UPDATE users SET ${data} WHERE email = '${req.user.email}' `,(err,rows) => {
            if(err){
                console.log(err)
                req.flash('tahap2', 'gagal')
                return res.redirect('users')
            } 

            return res.redirect('users')
        })
<<<<<<< HEAD
=======

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
>>>>>>> e549174db10280b97c4bb6db49f9dc1c6014d051
        
    })      

}

module.exports ={
    getUsersPage,
    submitTahap2
}