const express = require("express")
const path = require("path")
const flash = require("connect-flash")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const initWebRoutes = require('./routes/index')

const app = express()

// PUBLIC 
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// parse Url encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended:true}))

// use Cookie Parser
app.use(cookieParser('secret'))

// config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge : 1000 * 60 * 60 * 24
    }
}));

// enable Flash message
app.use(flash())

// VIEWS
app.set('view engine', 'ejs')

// conficg passport middleware
app.use(passport.initialize())
app.use(passport.session())

// init all Webroute
initWebRoutes(app)

const port = 3000
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})