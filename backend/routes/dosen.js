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
server.get('/lihatMatkul', controllers.RPS.lihatMatkul)
server.get('ubahMatkul', CekDosen, controllers.RPS.lihatMatkul)
server.get('/tambahMatkul', VerifyToken, controllers.RPS.hlmntambahMatkul)
server.post('/tambahMatkul', controllers.RPS.tambahMatkul)
server.get('/revisiMatkul/:idEdit/:course_plan_id/:course_plan.name', VerifyToken, controllers.RPS.hlmnrevisiMatkul)
server.post('/revisiMatkul/:idEdit/:course_plan_id/:course_plan.name', VerifyToken, controllers.RPS.revisiMatkul)

server.get('/CPMK/:id/:name', VerifyToken, controllers.course_los.CPMK)
server.get('/tambahCPMK/:id/:name', VerifyToken, controllers.course_los.hlmntambahCPMK)
server.post('/tambahCPMK/:id/:name', VerifyToken, controllers.course_los.tambahCPMK)
server.get('/hapusCPMK/:idHapus/:id/:name', VerifyToken, controllers.course_los.hapusCPMK)
server.get('/editCPMK/:idEdit/:id/:name', VerifyToken, controllers.course_los.hlmneditCPMK)
server.post('/editCPMK/:idEdit/:id/:name', VerifyToken, controllers.course_los.editCPMK)

server.get('/Referensi/:id/:name', VerifyToken, controllers.course_plan_references.Referensi) 
server.get('/tambahRef/:id/:name', VerifyToken, controllers.course_plan_references.hlmntambahRef)
server.post('/tambahRef/:id/:name', VerifyToken, controllers.course_plan_references.tambahRef)
server.get('/hapusRef/:idHapus/:id/:name', VerifyToken, controllers.course_plan_references.hapusRef)
server.get('/editRef/:idEdit/:id/:name', VerifyToken, controllers.course_plan_references.hlmneditRef)
server.post('/editRef/:idEdit/:id/:name', VerifyToken, controllers.course_plan_references.editRef)

server.get('/Penilaian/:id/:name', VerifyToken, controllers.course_plan_assessments.Penilaian) 
server.get('/tambahPenilaian/:id/:name', VerifyToken, controllers.course_plan_assessments.hlmntambahPenilaian)
server.post('/tambahPenilaian/:id/:name', VerifyToken, controllers.course_plan_assessments.tambahPenilaian)
server.get('/hapusPenilaian/:idHapus/:id/:name', VerifyToken, controllers.course_plan_assessments.hapusPenilaian)
server.get('/editPenilaian/:idEdit/:id/:name', VerifyToken, controllers.course_plan_assessments.hlmneditPenilaian)
server.post('/editPenilaian/:idEdit/:id/:name', VerifyToken, controllers.course_plan_assessments.editPenilaian)

server.get('/Pertemuan/:id/:name', VerifyToken, controllers.course_plan_details.Pertemuan)
server.get('/tambahPertemuan/:id/:name', VerifyToken, controllers.course_plan_details.hlmntambahPertemuan)
server.post('/tambahPertemuan/:id/:name', VerifyToken, controllers.course_plan_details.tambahPertemuan)
server.get('/hapusPertemuan/:idHapus/:id/:name', VerifyToken, controllers.course_plan_details.hapusPertemuan)
server.get('/editPertemuan/:idEdit/:id/:name', VerifyToken, controllers.course_plan_details.hlmneditPertemuan)
server.post('/editPertemuan/:idEdit/:id/:name', VerifyToken, controllers.course_plan_details.editPertemuan)

module.exports = server