const db = require("../configs/connectDB");
const bcrypt = require("bcryptjs");

let findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
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

let comparePasswordUser = (user, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) resolve(true);
      resolve("email atau password salah");
    } catch (e) {
      reject(e);
    }
  });
};

let findUserById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, rows) => {
        if (error) reject(error);
        let user = rows[0];
        resolve(user);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  findUserByEmail,
  comparePasswordUser,
  findUserById,
};
