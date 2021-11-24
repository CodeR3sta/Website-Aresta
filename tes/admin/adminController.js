const db = require("../configs/connectDB");
const path = require("path");
const bcrypt = require("bcryptjs");
const { rmdirSync } = require("fs");

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

      let kisArr = obj["kis"].split(",");
      let fotoDiriArr = obj["fotoDiri"].split(",");
      let postIgArr = obj["postIg"].split(",");

      return res.render("cek", {
        obj,
        kisArr,
        fotoDiriArr,
        postIgArr,
        anggota: [
          obj.anggota1,
          obj.anggota2,
          obj.anggota3,
          obj.anggota4,
          obj.anggota5,
          obj.anggota6,
          obj.anggota7,
          obj.anggota8,
          obj.anggota9,
          obj.anggota10,
          obj.anggota11,
          obj.anggota12,
          obj.anggota13,
          obj.anggota14,
          obj.anggota15,
          obj.anggota16,
          obj.anggota17,
          obj.anggota18,
          obj.anggota19,
          obj.anggota20,
          obj.anggota21,
          obj.anggota22,
          obj.anggota23,
          obj.anggota24,
        ],
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

    if (user) {
      let match = await comparePassword(user.hapus, req.body.password);

      if (match === true) {
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
        if (req.body.hasil === "benar") {
          db.query(
            "UPDATE users SET status = 3 WHERE id = ?",
            [req.params.id],
            (err, results) => {
              if (err) console.log(err);
              console.log("berhasil di Update");
              return res.redirect("/code/resta/panitia/users");
            }
          );
        } else {
          let pesan = req.body.pesan;
          db.query(
            `UPDATE users SET status = 1, pesan = '${pesan}',kis = '',suratRekomendasi = '',fotoTim = '',postIg = '', fotoDiri = '' WHERE id = ?`,
            [req.params.id],
            (err, results) => {
              if (err) {
                console.log(err);
                return res.redirect("/code/resta/panitia/users");
              }
              // hapus directory
              db.query(
                "SELECT * FROM users WHERE id = ?",
                [req.params.id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.redirect("/code/resta/panitia/users");
                  }
                  rmdirSync(
                    path.join(
                      __dirname,
                      "..",
                      "upload",
                      `${results[0].username}${results[0].sekolah}`
                    ),
                    { recursive: true },
                    (err) => {
                      if (err) {
                        console.log(err);
                        return res.redirect("/code/resta/panitia/users");
                      }
                      return res.redirect("/code/resta/panitia/users");
                    }
                  );
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

      if (match === true) {
        db.query(
          "UPDATE users SET status = 4 WHERE id = ?",
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
