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
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        }

        let chat = await registerService.createNewUser(newUser)
        req.flash('msg', chat)
        return res.redirect('/login')

    } catch (e) {
        req.flash('msg', e)
        return res.redirect('/register')
    }

}


module.exports = {
    registerGet,
    createNewUser
}

// let createNewUser = (req,res) => {
    
//     const {name , email, password, passwordConfirm} = req.body

//     // check required fields
//     if(!name || !email || !password || !passwordConfirm){
//         return res.render('register',{message : 'please fill in all fields'})
//     }

//     db.query(`SELECT email FROM WHERE email = ?`,[email],(err,results) => {
//         if(err){
//             console.log(err)
//         }

//         // check email
//         if(results.length > 0){
//             return res.render('register',{message : 'this email is ready'})
//         }

//         // check password match
//         if(password !== passwordConfirm){
//             return res.render('register', {message : 'password do not match'})
//         }

//         // check password length
//         if(password.length < 6){
//             return res.render('register',{message : 'password should be at least 6 char'})
//         }

//         db.query('INSERT INTO users SET ?',{name: name,email:email, password : password},(error, results)=>{
//             if(error){
//                 console.log(error)
//             }else{
//                 return res.render('login',{message : 'USERS REGISTERED'})
//             }
//         }) 
//     })
// }