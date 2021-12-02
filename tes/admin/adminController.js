const db = require("../configs/connectDB");
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// HOME status 1, 2, 3, 4 //CLEAR
let viewStatus = (req, res) => {
  db.query("SELECT * FROM users ORDER BY lomba,tingkat", (err, row) => {
    if (err) console.log(err);

    let row0 = [];
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];

    row.forEach((ppp) => {
      if (ppp.status === 0) {
        row0.push(ppp);
      } else if (ppp.status === 1) {
        row1.push(ppp);
      } else if (ppp.status === 2) {
        row2.push(ppp);
      } else if (ppp.status === 3) {
        row3.push(ppp);
      } else if (ppp.status === 4) {
        row4.push(ppp);
      }
    });

    return res.render("admin", { row, row0, row1, row2, row3, row4 });
  });
};

// FIND USERS //CLEAR
let findUsers = (req, res) => {
  let cari = req.body.search;
  db.query(
    "SELECT * FROM users WHERE namaUtama LIKE ?",
    ["%" + cari + "%"],
    (err, results) => {
      if (err) console.log(err);

      return res.render("admin", {
        row: results,
        row0: undefined,
        row1: undefined,
        row2: undefined,
        row3: undefined,
        row4: undefined,
      });
    }
  );
};

// VIEW USERS DATA //CLEAR
let viewUsers = (req, res) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) console.log(err);

      let obj = results[0];

      return res.render("cek", {
        obj,
      });
    }
  );
};

// VIEW USERS IMAGE //CLEAR
let usersImage = (req, res) => {
  return res.sendFile(
    path.join(
      __dirname,
      "..",
      "upload",
      `${req.params.username}${req.params.sekolah}`,
      `${req.params.gambar}`
    )
  );
};

// DELETE USERS //CLEAR
let deleteUsers = async (req, res) => {
  try {
    let user = await findUser(req.body.username);
    if (!user) {
      console.log("username salah");
      return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
    }
    let match = await comparePassword(user.hapus, req.body.password);

    if (user) {
      if (match === true) {
        db.query(
          `SELECT * FROM users WHERE id = ${req.params.id}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let us = result[0];

              let pathUp = path.join(
                __dirname,
                "..",
                "upload",
                `${us.username}${us.sekolah}`
              );

              fs.rmdir(pathUp, { recursive: true }, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        );

        db.query(
          "DELETE FROM users WHERE id = ?",
          [req.params.id],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("berhasil di hapus");
              return res.redirect("/code/resta/panitia/users");
            }
          }
        );
      } else {
        console.log(match);
        return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
  }
};

// KONFRIMASI TAHAP 2 //CLEAR
let confirmTahap2 = async (req, res) => {
  try {
    let user = await findUser(req.body.username);
    if (!user) {
      console.log("username salah");
      return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
    }

    if (user) {
      let match = await comparePassword(user.ubah, req.body.password);

      if (match === true) {
        let pesan1 = req.body.pesan;
        if (req.body.hasil === "benar") {
          db.query(
            `UPDATE users SET status = 3, pesan = '${pesan1}', imgVerified = '${new Date().toLocaleString()}' WHERE id = ?`,
            [req.params.id],
            (err, results) => {
              if (err) console.log(err);
              console.log("berhasil di Update");
              return res.redirect("/code/resta/panitia/users");
            }
          );
        } else {
          db.query(
            `SELECT * FROM users WHERE id = ${req.params.id}`,
            (err, result) => {
              if (err) console.log(err);
              let pesan = req.body.pesan;
              const directory = path.join(
                __dirname,
                "..",
                "upload",
                `${result[0].username}${result[0].sekolah}`
              );

              fs.readdir(directory, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                  fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                  });
                }
              });
              db.query(
                `UPDATE users SET status = 1, pesan = '${pesan}',suratRekomendasi = '',fotoTim = '',kis1 = '',postIg1 = '', fotoDiri1 = '',kis2 = '',postIg2 = '', fotoDiri2 = '',kis3 = '',postIg3 = '', fotoDiri3 = '',kis4 = '',postIg4 = '', fotoDiri4 = '',kis5 = '',postIg5 = '', fotoDiri5 = '',kis6 = '',postIg6 = '', fotoDiri6 = '',kis7 = '',postIg7 = '', fotoDiri7 = '',kis8 = '',postIg8 = '', fotoDiri8 = '',kis9 = '',postIg9 = '', fotoDiri9 = '',kis10 = '',postIg10 = '', fotoDiri10 = '',kis11 = '',postIg11 = '', fotoDiri11 = '',kis12 = '',postIg12 = '', fotoDiri12 = '',kis13 = '',postIg13 = '', fotoDiri13 = '',kis14 = '',postIg14 = '', fotoDiri14 = '',kis15 = '',postIg15 = '', fotoDiri15 = '',kis16 = '',postIg16 = '', fotoDiri16 = '',kis17 = '',postIg17 = '', fotoDiri17 = '',kis18 = '',postIg18 = '', fotoDiri18 = '',kis19 = '',postIg19 = '', fotoDiri19 = '',kis20 = '',postIg20 = '', fotoDiri20 = '',kis21 = '',postIg21 = '', fotoDiri21 = '',kis22 = '',postIg22 = '', fotoDiri22 = '',kis23 = '',postIg23 = '', fotoDiri23 = '',kis24 = '',postIg24 = '', fotoDiri24 = '',kis25 = '',postIg25 = '', fotoDiri25 = '' WHERE id = ?`,
                [req.params.id],
                (err, results) => {
                  if (err) console.log(err);
                  console.log("berhasil di Update");
                  return res.redirect("/code/resta/panitia/users");
                }
              );
            }
          );
        }
      } else {
        console.log(match);
        return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
  }
};

// KONFIRMASI TAHAP 3 / PEMBAYARAN //CLEAR
let confirmTahap3 = async (req, res) => {
  try {
    let user = await findUser(req.body.username);
    if (!user) {
      console.log("username salah");
      return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
    }

    if (user) {
      let match = await comparePassword(user.ubah, req.body.password);
      let pesan3 = req.body.pesan3;
      if (match === true) {
        db.query(
          `UPDATE users SET status = 4,pesan = '${pesan3}', endRegist = '${new Date().toLocaleString()}' WHERE id = ?`,
          [req.params.id],
          (err, results) => {
            if (err) console.log(err);

            console.log("berhail di update");
            return res.redirect(`/code/resta/panitia/users`);
          }
        );
      } else {
        console.log(match);
        return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect(`/code/resta/panitia/users/views/${req.params.id}`);
  }
};

/////////////////////////////////////////////////
module.exports = {
  viewStatus,
  findUsers,
  deleteUsers,
  viewUsers,
  confirmTahap2,
  confirmTahap3,
  usersImage,
};
////////////////////////////////////////////////

let findUser = (username) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `SELECT * FROM admin WHERE username = '${username}'`,
        (error, rows) => {
          if (error) reject(error);
          let user = rows[0];
          resolve(user);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let comparePassword = (confirmPass, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isMatch = await bcrypt.compare(password, confirmPass);
      if (isMatch) resolve(true);
      resolve("Username or Password Incorrect");
    } catch (e) {
      reject(e);
    }
  });
};
