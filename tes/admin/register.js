const db = require("../configs/connectDB");
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");

let reg = (req, res) => {
  let salt = bcryptjs.genSaltSync(15);

  let data = {
    id: uuid.v4(),
    username: req.body.username.toLowerCase(),
    password: bcryptjs.hashSync(req.body.password, salt),
    ubah: bcryptjs.hashSync(req.body.ubah, salt),
    hapus: bcryptjs.hashSync(req.body.hapus, salt),
  };

  db.query("INSERT INTO admin set ?", data, (error, row) => {
    if (error) {
      console.log(error);
    }

    return res.redirect("/");
  });
};

module.exports = {
  reg,
};
