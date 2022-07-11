const models = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const controllers = {}

controllers.home = async(req, res) => {
   const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const RPS = await models.course_plans.findAll({
        atribute : ['rev', 'code', 'name', 'credit', 'semester']
    })
    res.render("admin_listrps", {RPS, accessToken, nama, NIP} )
}

controllers.AksesDosen = async (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    models.lecturers.hasMany(models.course_plan_lecturers, {foreignKey : "id" })
    models.course_plan_lecturers.belongsTo(models.lecturers, {foreignKey : "lecturer_id"})

    const akses = await models.course_plan_lecturers.findAll({
        where : {
            course_plan_id : id
        },
        include : [{
            model : models.lecturers
        }]
    })
    res.render("admin_hak-akses-dosen", {akses, id, nama, name, NIP})
}

controllers.hlmTambahAksesDosen = async (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const dosen = await models.lecturers.findAll({})

    res.render("admin_listdosen", {dosen, id, nama, name, NIP})
}

controllers.cekTambahAksesDosen = async (req, res) => {
    const id = req.params.id
    const idDosen = req.params.idDosen
    const name = req.params.name
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const dosen = await models.lecturers.findOne({
        where : {
            id : idDosen
        }
    })
    res.render("admin_tambahdosen", {dosen, idDosen, id, nama, name, NIP})
}

controllers.tambahAksesDosen = async (req, res) => {
    try {
        const id = req.params.id
        const idDosen = req.params.idDosen
        const name = req.params.name
        const accessToken = req.cookies.accessToken 
        if (!accessToken)
        return res.status(200).json("tidak ada token")
        
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const id_dosen = payload.id
        const nama = payload.nama
        const NIP = payload.NIP

    await models.course_plan_lecturers.create({
        course_plan_id : id,
        lecturer_id : idDosen,
        creator : 0
    })
    res.status(200).redirect("/AksesDosen/"+id+"/"+name)
    }
    catch (err) {
        console.log(err)
    }
}

controllers.semuaCPMKdanCPL = async (req, res) => {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const RPS = await models.course_plans.findAll({
        atribute : ['rev', 'code', 'name', 'credit', 'semester']
    })
    res.render("admin_cpl-cpmk", {RPS, accessToken, nama, NIP})
}

controllers.CPMKdanCPL = async (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    models.course_los.hasMany(models.course_lo_details, {foreignKey : "id"})
    models.course_lo_details.belongsTo(models.course_los, {foreignKey : "course_lo_id"})

    const CPMK = await models.course_los.findAll({
        where : {
            course_plan_id : 2
        },
        include : {
            model : models.course_lo_details
        }
    })
    const CPL = await models.course_lo_details.findAll({
        include : {
            model: models.course_los,
            where : {
                course_plan_id : 2
            }
        }
    })
    res.render("admin_cetakpetacplcpmk", {CPL,CPMK, accessToken, nama,NIP})
}

controllers.persentaseRPS = async (req, res) => {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const RPS = await models.course_plans.count({})

    const hitung = await models.course_plan_assessments.count({
        where : {flag : 1}
    })
    var c = RPS - hitung
    var project = hitung/RPS*100
    var casee = c/RPS*100
    res.render("admin_persentaserps", {nama, NIP, hitung, RPS, project, casee})
}

module.exports = controllers