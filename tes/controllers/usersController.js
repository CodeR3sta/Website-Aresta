const { mkdir } = require("fs");
const db = require("../configs/connectDB");
const path = require("path");
const uuid = require("uuid");

let getUsersPage = (req, res) => {
  res.render("users", {
    user: req.user,
    anggota: [
      req.user.anggota1,
      req.user.anggota2,
      req.user.anggota3,
      req.user.anggota4,
      req.user.anggota5,
      req.user.anggota6,
      req.user.anggota7,
      req.user.anggota8,
      req.user.anggota9,
      req.user.anggota10,
      req.user.anggota11,
      req.user.anggota12,
      req.user.anggota13,
      req.user.anggota14,
      req.user.anggota15,
      req.user.anggota16,
      req.user.anggota17,
      req.user.anggota18,
      req.user.anggota19,
      req.user.anggota20,
      req.user.anggota21,
      req.user.anggota22,
      req.user.anggota23,
      req.user.anggota24,
    ],
    pesan: req.flash("tahap2"),
    msg2: req.flash("msg-2"),
  });
};

let submitTahap2 = async (req, res) => {
  console.log(req.files);
  // CEK ADA ISI ATAU TIDAK
  if (!req.files) {
    req.flash("tahap2", "isi");
    return res.redirect("users");
  }

  // BUAT VARIABLE UNTUK OBJ REQ FILES
  let fotoTim;
  if (req.user.lomba === "nasyid") {
    fotoTim = req.files["fotoTim"];
  }
  let suratRekomendasi = req.files["suratRekomendasi"];
  let kis = [];
  let fotoDiri = [];
  let postIg = [];

  for (let i = 1; i <= req.user.jumlahAnggota + 1; i++) {
    kis.push(req.files[`kis${i}`]);
    fotoDiri.push(req.files[`fotoDiri${i}`]);
    postIg.push(req.files[`postIg${i}`]);
  }

  // CEK EXTENSI DAN SIZE
  if (req.user.lomba === "nasyid") {
    cekExSize(fotoTim);
  }
  cekExSize(suratRekomendasi);
  cekExSizeArr(kis);
  cekExSizeArr(fotoDiri);
  cekExSizeArr(postIg);

  // HEX IMAGE NAME
  if (req.user.lomba === "nasyid") {
    hexImgName(fotoTim);
  }
  hexImgName(suratRekomendasi);
  hexImgNameArr(kis);
  hexImgNameArr(fotoDiri);
  hexImgNameArr(postIg);

  // BUAT VARIABLE UNTUK INSERT DB
  let fotoTimData;
  if (req.user.lomba === "nasyid") {
    fotoTimData = fotoTim["name"];
  }
  let suratRekomendasiData = suratRekomendasi["name"];
  let kisData = [];
  let fotoDiriData = [];
  let postIgData = [];

  // MENG ISI DATA
  kis.forEach((element) => {
    kisData.push(element["name"]);
  });

  fotoDiri.forEach((element) => {
    fotoDiriData.push(element["name"]);
  });

  postIg.forEach((element) => {
    postIgData.push(element["name"]);
  });

  // sql
  let data;
  if (req.user.lomba === "nasyid") {
    data = `status = 2,kis = '${kisData}',suratRekomendasi = '${suratRekomendasiData}',fotoTim = '${fotoTimData}',postIg = '${postIgData}',fotoDiri='${fotoDiriData}'`;
  } else {
    data = `status = 2,kis = '${kisData}',suratRekomendasi = '${suratRekomendasiData}',postIg = '${postIgData}',fotoDiri='${fotoDiriData}'`;
  }

  // INSERT DATA
  db.query(
    `UPDATE users SET ${data} WHERE email = '${req.user.email}' `,
    (err, rows) => {
      if (err) {
        console.log(err);
        req.flash("tahap2", "gagal");
        return res.redirect("/users");
      } else {
        // buat PATH Upload
        let pathUp = path.join(
          __dirname,
          "..",
          "upload",
          `${req.user.username}${req.user.sekolah}/`
        );

        mkdir(pathUp, 0o777, (err) => {
          if (err) {
            db.query(
              `DELETE FROM users WHERE email = '${req.user.email}'`,
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  req.flash("tahap2", "gagal");
                  return res.redirect("/users");
                }
              }
            );
            req.flash("tahap2", "gagal");
            return res.redirect("/users");
          } else {
            if (req.user.lomba === "nasyid") {
              imgUp(fotoTim, pathUp);
            }
            imgUp(suratRekomendasi, pathUp);
            imgUpArr(kis, pathUp);
            imgUpArr(fotoDiri, pathUp);
            imgUpArr(postIg, pathUp);

            return res.redirect("/users");
          }
        });
      }
    }
  );
};

module.exports = {
  getUsersPage,
  submitTahap2,
};

let cekExSize = (vaiable) => {
  //CEK EXTENSI PNG JPG JPEG ONLY
  if (
    vaiable.mimetype === "image/png" ||
    vaiable.mimetype === "image/jpg" ||
    vaiable.mimetype === "image/jpeg"
  ) {
  } else {
    req.flash("tahap2", "extensi");
    return res.redirect("/users");
  }
  // CEK SIZE KURANG DARI 20MB
  if (vaiable.size > 20000000) {
    req.flash("tahap2", "ukuran");
    return res.redirect("/users");
  }
};

let cekExSizeArr = (array) => {
  array.forEach((element) => {
    //CEK EXTENSI PNG JPG JPEG ONLY
    if (
      element.mimetype === "image/png" ||
      element.mimetype === "image/jpg" ||
      element.mimetype === "image/jpeg"
    ) {
    } else {
      req.flash("tahap2", "extensi");
      return res.redirect("/users");
    }
    // CEK SIZE KURANG DARI 20MB
    if (element.size > 20000000) {
      req.flash("tahap2", "ukuran");
      return res.redirect("/users");
    }
  });
};

let hexImgName = (variable) => {
  if (variable.mimetype === "image/png") {
    variable["name"] = uuid.v4() + ".png";
  } else if (variable.mimetype === "image/jpg") {
    variable["name"] = uuid.v4() + ".jpg";
  } else if (variable.mimetype === "image/jpeg") {
    variable["name"] = uuid.v4() + ".jpeg";
  }
};

let hexImgNameArr = (array) => {
  array.forEach((element) => {
    if (element.mimetype === "image/png") {
      element["name"] = uuid.v4() + ".png";
    } else if (element.mimetype === "image/jpg") {
      element["name"] = uuid.v4() + ".jpg";
    } else if (element.mimetype === "image/jpeg") {
      element["name"] = uuid.v4() + ".jpeg";
    }
  });
};

let imgUp = (variable, pathUp) => {
  variable.mv(pathUp + `${variable.name}`, (err) => {
    if (err) {
      db.query(
        `DELETE FROM users WHERE email = '${req.user.email}'`,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            req.flash("tahap2", "gagal");
            return res.redirect("/users");
          }
        }
      );
      req.flash("tahap2", "gagal");
      return res.redirect("/users");
    }
  });
};

let imgUpArr = (array, pathUp) => {
  array.forEach((element) => {
    element.mv(pathUp + `${element.name}`, (err) => {
      if (err) {
        db.query(
          `DELETE FROM users WHERE email = '${req.user.email}'`,
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              req.flash("tahap2", "gagal");
              return res.redirect("/users");
            }
          }
        );
        req.flash("tahap2", "gagal");
        return res.redirect("/users");
      }
    });
  });
};
