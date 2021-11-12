
let getUsersPage = (req, res) => {res.render('users',{
    user : req.user,
    anggota : [
        req.user.anggota1,
        req.user.anggota2,
        req.user.anggota3,
        req.user.anggota4,
        req.user.anggota5
    ],
    pesan : req.flash('tahap2')
})}

let submitTahap2 = (req,res) => {

    let kis = {
        type : req.files.kis.mimetype,
        size : req.files.kis.size
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        req.flash('tahap2', 'isi')
        return res.redirect('users')
    }else if (kis.type === 'image/png' || kis.type === 'image/jpg' || kis.type === 'image/jpeg' || kis.type === 'application/pdf') {
        req.flash('tahap2', 'true')
        res.redirect('users')
    }

    console.log('hai')
    // if (kis.size ) {}

    

}

module.exports ={
    getUsersPage,
    submitTahap2
}