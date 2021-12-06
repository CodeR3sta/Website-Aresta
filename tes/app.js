const express = require("express");
const flash = require("connect-flash");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const { initWebRoutes } = require("./routes/index");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

// FILE UPLOADER
app.use(fileUpload());

// PUBLIC
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// parse Url encoded bodies (as sent by HTML forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use Cookie Parser
app.use(cookieParser("secret"));

let sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SESI,
  createDatabaseTable: true,
  expiration: 86400000,
  schema: {
    tableName: "sessiontb1",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

// config session
app.use(
  session({
    secret: "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

// enable Flash message
app.use(flash());

// VIEWS
app.set("view engine", "ejs");

// conficg passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all Webroute
initWebRoutes(app);

app.use("/", (req, res) => {
  res.status(404).render("404");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
