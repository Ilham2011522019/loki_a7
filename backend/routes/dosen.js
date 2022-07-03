const express = require('express')
const server = express.Router()
const controllers = require('../controllers/index.js')
const VerifyToken = require('../middleware/VerifyToken.js')
const CekDosen = require('../middleware/CekDosen.js')

server.get('/dosen', (req, res) => {
    res.render("login3")
})
server.post('/loginDosen', controllers.auth.loginDosen)

server.get('/semuaMatkul', VerifyToken, controllers.dosen.matkul)
server.get('/lihatMatkul', controllers.RPS.lihatRPS)
server.get('/ubahRPS', CekDosen, controllers.RPS.lihatRPS)
server.get('/tambahRPS', VerifyToken, controllers.RPS.hlmTambahRPS)
server.post('/tambahRPS', controllers.RPS.tambahRPS)
server.get('/revisiRPS/:idEdit/:course_plan_id/:course_plan.name', VerifyToken, controllers.RPS.hlmRevisiRPS)
server.post('/revisiRPS/:idEdit/:course_plan_id/:course_plan.name', VerifyToken, controllers.RPS.revisiRPS)

server.get('/semuaRef', VerifyToken, controllers.course_plan_references.semuaRef) //ref kelar semua
server.get('/detailRef/:id/:name', VerifyToken, controllers.course_plan_references.DetailRef) 
server.get('/tambahRef/:id/:name', VerifyToken, controllers.course_plan_references.hlmTambahRef)
server.post('/tambahRef/:id/:name', VerifyToken, controllers.course_plan_references.tambahRef)
server.get('/hapusRef/:idHapus/:id/:name', VerifyToken, controllers.course_plan_references.hapusRef)
server.get('/editRef/:idEdit/:id/:name', VerifyToken, controllers.course_plan_references.hlmEditRef)
server.post('/editRef/:idEdit/:id/:name', VerifyToken, controllers.course_plan_references.editRef)

server.get('/semuaKomponen', VerifyToken, controllers.course_plan_assessments.semuaKomponen) //komponen kelar semua
server.get('/detailKomponen/:id/:name', VerifyToken, controllers.course_plan_assessments.detailKomponen) 
server.get('/tambahKomponen/:id/:name', VerifyToken, controllers.course_plan_assessments.hlmTambahKomponen)
server.post('/tambahKomponen/:id/:name', VerifyToken, controllers.course_plan_assessments.tambahKomponen)
server.get('/hapusKomponen/:idHapus/:id/:name', VerifyToken, controllers.course_plan_assessments.hapusKomponen)
server.get('/editKomponen/:idEdit/:id/:name', VerifyToken, controllers.course_plan_assessments.hlmEditKomponen)
server.post('/editKomponen/:idEdit/:id/:name', VerifyToken, controllers.course_plan_assessments.editKomponen)

server.get('/semuaPertemuan', VerifyToken, controllers.course_plan_details.semuaPertemuan) //pertemuan kelar semua
server.get('/detailPertemuan/:id/:name', VerifyToken, controllers.course_plan_details.detailPertemuan)
server.get('/tambahPertemuan/:id/:name', VerifyToken, controllers.course_plan_details.hlmTambahPertemuan)
server.post('/tambahPertemuan/:id/:name', VerifyToken, controllers.course_plan_details.tambahPertemuan)
server.get('/hapusPertemuan/:idHapus/:id/:name', VerifyToken, controllers.course_plan_details.hapusPertemuan)
server.get('/editPertemuan/:idEdit/:id/:name', VerifyToken, controllers.course_plan_details.hlmEditPertemuan)
server.post('/editPertemuan/:idEdit/:id/:name', VerifyToken, controllers.course_plan_details.editPertemuan)

server.get('/semuaCPMK', VerifyToken, controllers.course_los.semuaCPMK) //CPMK kelar semua
server.get('/detailCPMK/:id/:name', VerifyToken, controllers.course_los.detailCPMK)
server.get('/tambahCPMK/:id/:name', VerifyToken, controllers.course_los.hlmTambahCPMK)
server.post('/tambahCPMK/:id/:name', VerifyToken, controllers.course_los.tambahCPMK)
// server.get('/tambahCPLkeCPMK/:id/:name', cekLogin, controllers.course_los.hlmTambahCPLkeCPMK)
// server.post('/tambahCPLkeCPMK/:idTambah/:id/:name', cekLogin, controllers.course_los.tambahCPLkeCPMK)
server.get('/hapusCPMK/:idHapus/:id/:name', VerifyToken, controllers.course_los.hapusCPMK)
server.get('/editCPMK/:idEdit/:id/:name', VerifyToken, controllers.course_los.hlmEditCPMK)
server.post('/editCPMK/:idEdit/:id/:name', VerifyToken, controllers.course_los.editCPMK)

module.exports = server