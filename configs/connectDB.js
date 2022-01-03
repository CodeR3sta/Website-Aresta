const mysql = require('mysql')
require('dotenv').config()

// CONNECT DATABASE
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})
db.connect((err)=> {
    if(err){
        console.log(err)
    }else{
        console.log("Mysql Connected")
    }
})

module.exports = db