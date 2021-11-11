
let getUsersPage = (req, res) => {res.render('users',{
    user : req.user,
    anggota : [
        req.user.anggota1,
        req.user.anggota2,
        req.user.anggota3,
        req.user.anggota4,
        req.user.anggota5
    ]
})}

let submitTahap2 = (req,res) => {
    let data = {
        user : req.user,
        anggota : [
            req.user.anggota1,
            req.user.anggota2,
            req.user.anggota3,
            req.user.anggota4,
            req.user.anggota5
        ]
    }

    let kis = {
        type : req.files.kis.mimetype,
        size : req.files.kis.size,
    }

    let abc = req.files.kis

    if (kis.type === 'image/png' || kis.type === 'image/jpg' || kis.type === 'image/jpeg' || kis.type === 'application/pdf') {
        console.log(__dirname)
    }else{
        console.log('extensi file anda bukan png, jpg, jpeg, pdf')
    }
    // if (kis.size ) {}

    

}

module.exports ={
    getUsersPage,
    submitTahap2
}