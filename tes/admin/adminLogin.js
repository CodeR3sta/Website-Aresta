const express = require("express");
const app = express();
const db = require('../configs/connectDB')
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
const { createTokens } = require("./JWT");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))


let getLogin = (req,res) => {
    res.render('adminLogin', {
      msgAdmin : req.flash('msgAdminLogin')
    })
}

let postLogin = async(req,res) => {

  let user = await findUser(req.body.username)
  if (!user) {
    req.flash('msgAdminLogin', 'Username or Password Incorrect')
    return res.redirect('/code/resta/panitia/login')
  }

  if (user) {
    let match = await comparePassword(user, req.body.password)

    if (match === true) {
      const accessToken = createTokens(user);
  
      res.cookie("access-token", accessToken, {
        maxAge: 1 * 1 * 60 * 60 * 1000,
        httpOnly: true, 
      });
      
      return res.redirect('/code/resta/panitia/users')
    }else{
      req.flash('msgAdminLogin', match)
      return res.redirect('/code/resta/panitia/login')
    }
  }
  
}

let findUser = (username) => {
  return new Promise((resolve, reject) => {
      try {
          db.query(`SELECT * FROM admin WHERE username = '${username}'`, (error, rows) => {
              if(error) reject(error)
              let user = rows[0]
              resolve(user)
          })
      } catch (e) {
          reject(e)
      }
  })
}

let comparePassword = (user, password) => {
  return new Promise(async (resolve, reject) => {
      try {
          let isMatch = await bcrypt.compare(password, user.password)
          if(isMatch) resolve(true)
          resolve('Username or Password Incorrect')
      } catch (e) {
          reject(e)
      }
  })
}

module.exports = {
    getLogin,
    postLogin,
    findUser,
    comparePassword
}
