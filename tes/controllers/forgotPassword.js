const db = require("../configs/connectDB");
const bcrypt = require("bcryptjs");
const transporter = require("../configs/transporterMail");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

let getForgot = (req, res) => {
  return res.render("forgetPass", {
    hal: "forgot",
    msgForgot: req.flash("msgForgot"),
  });
};

let postForget = (req, res) => {
  // validate all required fields
  let errorsArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("msgForgot", errorsArr);
    return res.redirect("/forgot-password");
  }

  const email = req.body.email;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(404)
        .send(
          `<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;">error</h1>`
        );
    } else {
      console.log(result);

      if (result.length > 0) {
        if (result[0].status === 0) {
          req.flash("msgForgot", "Akun belum di verifikasi");
          return res.redirect("/forgot-password");
        }

        let token = jwt.sign(
          { email: result[0].email, id: result[0].id },
          process.env.TOKEN_FORGOTPASS,
          { expiresIn: "10m" }
        );

        let mailOption = {
          from: process.env.MAIL,
          to: `${req.body.email}`,
          subject: `Reset Password`,
          html: `<h1>Reset Password</h1><br><hr>
                    <p>klik link di bawah ini untuk ubah password</p>
                    <a href="http://localhost:3000/reset-password/?verify=${token}">reset-account</a>`,
        };

        transporter.sendMail(mailOption, (err, info) => {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send(
                `<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;">error</h1>`
              );
          } else {
            console.log(info);

            return res.send(
              `<h1 style="margin:50px auto;padding: 10px;width:80%;background-color: #0db02b;color:white;text-align:center;border-radius:10px;">pesan berhasil dikirim ke email anda</h1>`
            );
          }
        });
      } else {
        req.flash("msgForgot", "email tidak ditemukan");
        return res.redirect("/forgot-password");
      }
    }
  });
};

let getReset = (req, res) => {
  if (!req.query["verify"]) return res.status(404).send("Page Not Found");

  let tokenAmbil = req.query["verify"];
  try {
    const validToken = jwt.verify(tokenAmbil, process.env.TOKEN_FORGOTPASS);
    if (validToken) {
      return res.render("forgetPass", {
        hal: "reset",
        token: req.query["verify"],
        msgForgot: req.flash("msgForgot"),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Page Not Found");
  }
};

let postReset = (req, res) => {
  let ambil = req.query["verify"];

  // validate all required fields
  let errorsArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("msgForgot", errorsArr);
    return res.redirect(`/reset-password/?verify=${ambil}`);
  }

  const data = jwt.verify(ambil, process.env.TOKEN_FORGOTPASS);

  let salt = bcrypt.genSaltSync(10);
  let password = bcrypt.hashSync(req.body.password, salt);
  db.query(
    `UPDATE users SET password = '${password}' WHERE email = '${data.email}'`,
    (err, result) => {
      if (err) {
        return res.send("Gagal Mengubah Password");
      } else {
        return res.send("Password Berhasil di Ubah");
      }
    }
  );
};

module.exports = { getForgot, getReset, postForget, postReset };
