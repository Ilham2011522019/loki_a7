const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    
    try {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    res.render("loginDosen")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id = payload.id
    const nama = payload.nama
    const NIP = payload.NIP
    next()
    }
    catch (err) {
        res.render("main_login")
    }
}

module.exports = verifyToken