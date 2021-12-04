const db = require("../configs/connectDB");
const path = require("path");
const uuid = require("uuid");

let getUsersPage = (req, res) => {
  return res.render("users", {
    user: req.user,
    pesan: req.flash("tahap2"),
    msg2: req.flash("msg-2"),
  });
};

let submitTahap2 = async (req, res, next) => {
  try {
    // CEK ADA ISI ATAU TIDAK
    if (!req.files) {
      req.flash("tahap2", "isi");
      return res.redirect("/users");
    }
    // BUAT VARIABLE UNTUK OBJ REQ FILES
    let file = req.files[req.params.data];
    //   CEK EXTENSI DAN SIZE
    await cekExSize(req, res, file);
    // HEX image NAME
    await hexImgName(file);
    // Variable for HEX NAME
    let hexName = file["name"];

    // buat status
    let fix = await buatStatus(req);

    let dataInsert;

    if (req.user.lomba === "nasyid") {
      // karena file terakhir yg mau di upload jadi + 2
      if (fix === (req.user.jumlahAnggota + 1) * 2 + 1) {
        dataInsert = `status = 2,${req.params.data} = '${hexName}'`;
      } else {
        dataInsert = `status = 1,${req.params.data} = '${hexName}'`;
      }
    } else {
      if (fix === (req.user.jumlahAnggota + 1) * 2) {
        dataInsert = `status = 2,${req.params.data} = '${hexName}'`;
      } else {
        dataInsert = `status = 1,${req.params.data} = '${hexName}'`;
      }
    }

    // INSERT DATABSE
    db.query(
      `UPDATE users SET ${dataInsert} WHERE email = '${req.user.email}' `,
      async (err, rows) => {
        if (err) {
          console.log(err);
          req.flash("tahap2", "gagal");
          return res.redirect("/users");
        } else {
          try {
            // buat PATH Upload
            let pathUp = path.join(
              __dirname,
              "..",
              "upload",
              `${req.user.username}${req.user.sekolah}/`
            );

            await imgUp(req, file, pathUp);
            return res.redirect("/users");
          } catch (error) {
            req.flash("tahap2", error);
            return res.redirect("/users");
          }
        }
      }
    );
  } catch (error) {
    console.log("error");
    req.flash("tahap2", error);
    return res.redirect("/users");
  }
};

module.exports = {
  getUsersPage,
  submitTahap2,
};

let cekExSize = (req, res, vaiable) => {
  return new Promise((resolve, reject) => {
    try {
      //CEK EXTENSI PNG JPG JPEG ONLY
      if (
        vaiable.mimetype === "image/png" ||
        vaiable.mimetype === "image/jpg" ||
        vaiable.mimetype === "image/jpeg"
      ) {
        // CEK SIZE KURANG DARI 20MB
        if (vaiable.size > 20000000) {
          reject("ukuran");
        } else {
          resolve();
        }
      } else {
        reject("extensi");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let hexImgName = (variable) => {
  return new Promise((resolve, reject) => {
    try {
      if (variable.mimetype === "image/png") {
        variable["name"] = uuid.v4() + ".png";
        resolve();
      } else if (variable.mimetype === "image/jpg") {
        variable["name"] = uuid.v4() + ".jpg";
        resolve();
      } else if (variable.mimetype === "image/jpeg") {
        variable["name"] = uuid.v4() + ".jpeg";
        resolve();
      } else {
        reject();
      }
    } catch (error) {
      reject(error);
    }
  });
};

let imgUp = (req, variable, pathUp) => {
  return new Promise((resolve, reject) => {
    try {
      variable.mv(pathUp + `${variable.name}`, (err) => {
        if (err) {
          db.query(
            `UPDATE users SET ${req.params.data} = '' WHERE email = '${req.user.email}'`,
            (err, results) => {
              if (err) {
                reject("gagal");
              } else {
                reject("gagal");
              }
            }
          );
        } else {
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

let buatStatus = (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        `SELECT * FROM users WHERE email = '${req.user.email}'`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let fix = 0;
            let org = result[0];
            if (org.suratRekomendasi != "") {
              fix += 1;
            }
            if (org.fotoTim != "") {
              fix += 1;
            }
            for (let i = 1; i <= req.user.jumlahAnggota + 1; i++) {
              if (org[`kis${i}`] != "") {
                fix += 1;
              }
            }
            for (let i = 1; i <= req.user.jumlahAnggota + 1; i++) {
              if (org[`postIg${i}`] != "") {
                fix += 1;
              }
            }
            for (let i = 1; i <= req.user.jumlahAnggota + 1; i++) {
              if (org[`fotoDiri${i}`] != "") {
                fix += 1;
              }
            }

            resolve(fix);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};
