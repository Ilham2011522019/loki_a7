const express = require('express')
const server = express.Router()
const controllers = require('../controllers/index.js')
const VerifyToken = require('../middleware/VerifyToken.js')
const CekAdmin = require('../middleware/CekAdmin.js')

server.get('/admin', (req, res) => {
    res.render("login2")
})
server.post('/loginAdmin', controllers.auth.loginAdmin)
server.get('/homeAdmin', VerifyToken, controllers.admin.home)

server.get('/AksesDosen/:id/:name', VerifyToken, controllers.admin.AksesDosen)
server.get('/tambahAksesDosen/:id/:name', VerifyToken, controllers.admin.hlmTambahAksesDosen)
server.get('/tambahAksesDosen/:idDosen/:id/:name', VerifyToken, controllers.admin.cekTambahAksesDosen)
server.post('/tambahAksesDosen/:idDosen/:id/:name', VerifyToken, controllers.admin.tambahAksesDosen)
server.get('/semuaCPMKdanCPL', VerifyToken, controllers.admin.semuaCPMKdanCPL)
server.get('/CPMKdanCPL/:id/:name', VerifyToken, controllers.admin.CPMKdanCPL)
server.get('/CPMKdanCPL/:id/:name', VerifyToken, controllers.admin.CPMKdanCPL)
server.get('/persentaseRPS', VerifyToken, controllers.admin.persentaseRPS)

module.exports = server