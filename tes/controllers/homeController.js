

let getHomePage = (req, res) => {
    return res.render('home', {
        user : req.user
    })
}

module.exports = {
    getHomePage
}