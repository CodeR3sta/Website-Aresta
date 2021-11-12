
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


    if (!req.files || Object.keys(req.files).length < 4 || Object.keys(req.files).length > 4) {
        req.flash('tahap2', 'isi')
        return res.redirect('users')
    }
    
    for (let index = 0; index < Object.keys(req.files).length ; index++) {
        console.log(req.files[index])        
    }

    let object = req.files

    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];
            if (condition) {
                
            }
        }
    }
    console.log('hai')
    // if (kis.size ) {}

    

}

module.exports ={
    getUsersPage,
    submitTahap2
}