const { sign, verify } = require("jsonwebtoken");
require('dotenv').config()

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.TOKEN
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.redirect('/code/resta/panitia/login');

  try {
    const validToken = verify(accessToken, process.env.TOKEN);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
