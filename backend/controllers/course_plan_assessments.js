const models = require('../models/index')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')
const controllers = {}

controllers.hlmntambahPenilaian = async (req, res) => {
    const name = req.params.name
    const id = req.params.id
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP
    res.render("dosen_tambahpenilaian", {name, nama, NIP, id})
}

controllers.hlmneditPenilaian = async (req, res) => {
    const id = req.params.id
    const name = req.params.name
    const idEdit = req.params.idEdit
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    return res.status(200).json("tidak ada token")
    
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const komponen = await models.course_plan_assessments.findOne({
        where : {
            id : req.params.idEdit
        }
    })
    res.render("dosen_editpenilaian", {komponen, idEdit, id, name, nama, NIP})
}

controllers.editPenilaian = async (req, res) => {
    try {
        const idEdit = req.params.idEdit
        const accessToken = req.cookies.accessToken 
        if (!accessToken)
        return res.status(200).json("tidak ada token")
        
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const id_dosen = payload.id
        const nama = payload.nama
        const NIP = payload.NIP

        const id = req.params.id
        const name = req.params.name

        await models.course_plan_assessments.update({
            percentage      : req.body.percentage,
        },{
            where : {id : req.params.idEdit}
        })
        res.status(200).redirect("/Penilaian/"+id+"/"+name)
    }
    catch (err) {
        console.log(err);
    }
}

controllers.tambahPenilaian = async (req, res) => {
    try {
        const id = req.params.id
        const name = req.params.name
        if (req.body.name == "Tugas Besar"){
            await models.course_plan_assessments.create({
                course_plan_id  : req.params.id,
                name            : req.body.name,
                percentage      : req.body.percentage,
                flag            : 1
            })
        }
        else{
            await models.course_plan_assessments.create({
                course_plan_id  : req.params.id,
                name            : req.body.name,
                percentage      : req.body.percentage,
                flag            : 0
            })
        }
        res.status(200).redirect("/Penilaian/"+id+"/"+name)
    }
    catch (err) {
        console.log(err);
        res.json({err})
    }
}

controllers.Penilaian = async (req, res) => {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
    res.render("loginDosen")
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const id = req.params.id
    const name = req.params.name
    const komponen = await models.course_plan_assessments.findAll({
        where : {
            course_plan_id : req.params.id
        }
    })
    res.render("dosen_penilaian", {komponen, name, nama, NIP, id})
}

controllers.hapusPenilaian = async (req, res) => {
    try {
        const id = req.params.id
        const name = req.params.name
        await models.course_plan_assessments.destroy({
            where : {
                id   : req.params.idHapus
            }
        })
        res.status(200).redirect("/Penilaian/"+id+"/"+name) 
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = controllers