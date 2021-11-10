
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

module.exports ={
    getUsersPage
}