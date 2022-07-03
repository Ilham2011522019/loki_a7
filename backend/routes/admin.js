const express = require('express')
const server = express.Router()
const controllers = require('../controllers/index.js')
const VerifyToken = require('../middleware/VerifyToken.js')
const CekAdmin = require('../middleware/CekAdmin.js')

server.get('/admin', (req, res) => {
    res.render("login2")
})
server.post('/loginAdmin', controllers.auth.loginAdmin) // UDAH BISA
server.get('/homeAdmin', VerifyToken, controllers.admin.home) // UDAH BISA

server.get('/detailAksesDosen/:id/:name', VerifyToken, controllers.admin.detailAksesDosen) // UDAH BISA
server.get('/detailCPMKdanCPL/:id/:name', VerifyToken, controllers.admin.detailCPMKdanCPL)
server.get('/tambahAksesDosen/:id/:name', VerifyToken, controllers.admin.hlmTambahAksesDosen)
server.get('/tambahAksesDosen/:idDosen/:id/:name', VerifyToken, controllers.admin.cekTambahAksesDosen)
server.post('/tambahAksesDosen/:idDosen/:id/:name', VerifyToken, controllers.admin.tambahAksesDosen)

server.get('/detailCPMKdanCPL/:id/:name', VerifyToken, controllers.admin.detailCPMKdanCPL)
server.get('/semuaCPMKdanCPL', VerifyToken, controllers.admin.semuaCPMKdanCPL)

server.get('/semuaAksesDosen', VerifyToken, controllers.admin.semuaAksesDosen)

server.get('/detailRPS/:id/:name', VerifyToken, controllers.admin.detailRPS)

module.exports = server