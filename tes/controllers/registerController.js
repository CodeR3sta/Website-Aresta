const { validationResult } = require("express-validator");
const registerService = require("../service/registerService");
const db = require("../configs/connectDB");
const { mkdir } = require("fs");
const path = require("path");

let registerGet = (req, res) => {
  res.render("register", {
    message: req.flash("msg"),
  });
};

let createNewUser = async (req, res) => {
  // validate all required fields
  let errorsArr = [];
  let validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    let errors = Object.values(validationErr.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("msg", errorsArr);
    return res.redirect("/register");
  }

  try {
    let newUser = {
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      sekolah: req.body.asalSekolah,
      tingkat: req.body.sekolah,
      lomba: req.body.lomba,
      kategori: req.body.kelompok,
      namaUtama: req.body.namaUtama,
    };

    let newUsers = anggota(req, newUser);

    let jumlahAnggota = 0;

    for (let i = 1; i <= 24; i++) {
      if (newUsers[`anggota${i}`] != "") {
        jumlahAnggota += 1;
      }
    }

    newUsers["jumlahAnggota"] = jumlahAnggota;

    let chat = await registerService.createNewUser(newUsers, res);
    req.flash("msg", chat);
    // let userData = {
    //   email: `${req.body.email}`,
    // };
    // res.cookie("userInfo", userData, {
    //   maxAge: 1 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    // });
    return res.send(
      `<div style="margin:50px auto;padding: 10px;width:80%;background-color: #0db02b;color:white;text-align:center;border-radius:10px;"><h1>Berhasil Menyelesaikan Tahap 1 pendaftaran, klik link dibawah utk menyelesaikan tahap berikutnya</h1><a href="/login">Click disini untuk Login</a></div>`
    );
  } catch (e) {
    req.flash("msg", e);
    return res.redirect("/register");
  }
};

let cekNamaAnggota = (nama) => {
  if (nama === undefined) {
    nama = "";
    return nama;
  } else {
    return nama;
  }
};

let anggota = (req, newUser) => {
  newUser["anggota1"] = cekNamaAnggota(req.body.namaAnggota1);
  newUser["anggota2"] = cekNamaAnggota(req.body.namaAnggota2);
  newUser["anggota3"] = cekNamaAnggota(req.body.namaAnggota3);
  newUser["anggota4"] = cekNamaAnggota(req.body.namaAnggota4);
  newUser["anggota5"] = cekNamaAnggota(req.body.namaAnggota5);
  newUser["anggota6"] = cekNamaAnggota(req.body.namaAnggota6);
  newUser["anggota7"] = cekNamaAnggota(req.body.namaAnggota7);
  newUser["anggota8"] = cekNamaAnggota(req.body.namaAnggota8);
  newUser["anggota9"] = cekNamaAnggota(req.body.namaAnggota9);
  newUser["anggota10"] = cekNamaAnggota(req.body.namaAnggota10);
  newUser["anggota11"] = cekNamaAnggota(req.body.namaAnggota11);
  newUser["anggota12"] = cekNamaAnggota(req.body.namaAnggota12);
  newUser["anggota13"] = cekNamaAnggota(req.body.namaAnggota13);
  newUser["anggota14"] = cekNamaAnggota(req.body.namaAnggota14);
  newUser["anggota15"] = cekNamaAnggota(req.body.namaAnggota15);
  newUser["anggota16"] = cekNamaAnggota(req.body.namaAnggota16);
  newUser["anggota17"] = cekNamaAnggota(req.body.namaAnggota17);
  newUser["anggota18"] = cekNamaAnggota(req.body.namaAnggota18);
  newUser["anggota19"] = cekNamaAnggota(req.body.namaAnggota19);
  newUser["anggota20"] = cekNamaAnggota(req.body.namaAnggota20);
  newUser["anggota21"] = cekNamaAnggota(req.body.namaAnggota21);
  newUser["anggota22"] = cekNamaAnggota(req.body.namaAnggota22);
  newUser["anggota23"] = cekNamaAnggota(req.body.namaAnggota23);
  newUser["anggota24"] = cekNamaAnggota(req.body.namaAnggota24);

  return newUser;
};

// // VERIFICATION
// let verifikasiEmail = (req, res) => {
//   try {
//     db.query(
//       "SELECT * FROM users WHERE email = ?",
//       req.cookies.userInfo.email,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return res.send(
//             `<div style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;"><h1>Silahkan daftar Terlebih Dahulu</h1></div>`
//           );
//         }
//         if (req.query.verify === result[0].verification) {
//           let pathUp = path.join(
//             __dirname,
//             "..",
//             "upload",
//             `${result[0].username}${result[0].sekolah}/`
//           );

//           mkdir(pathUp, 0o777, (err) => {
//             if (err) {
//               console.log(err);
//               if (err.code === "EEXIST") {
//                 return res.send(
//                   `<div style="margin:50px auto;padding: 10px;width:80%;background-color: #0db02b;color:white;text-align:center;border-radius:10px;"><h1>Akun Anda Sudah Aktif</h1><a href="/login">Klik Disini Untuk Login</a></div>`
//                 );
//               }
//             } else {
//               db.query(
//                 `UPDATE users SET status = 1, verified = '${new Date().toLocaleString()}' WHERE email = ?`,
//                 req.cookies.userInfo.email,
//                 (err, result) => {
//                   if (err) console.log(err);

//                   return res.send(
//                     `<div style="margin:50px auto;padding: 10px;width:80%;background-color: #0db02b;color:white;text-align:center;border-radius:10px;"><h1>Akun Anda Telah Aktif</h1><a href="/login">Klik Disini Untuk Login</a></div>`
//                   );
//                 }
//               );
//             }
//           });
//         } else {
//           return res.send(
//             `<div style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;"><h1>Gagal Verifikasi Akun</h1></div>`
//           );
//         }
//       }
//     );
//   } catch (error) {
//     return res.send(
//       `<div style="margin:50px auto;padding: 10px;width:80%;background-color: red;color:white;text-align:center;border-radius:10px;"><h1>Silahkan daftar Terlebih Dahulu</h1></div>`
//     );
//   }
// };
module.exports = {
  registerGet,
  createNewUser,
  // verifikasiEmail,
};
