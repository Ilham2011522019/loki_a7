const models = require('../models/index')
const jwt = require('jsonwebtoken')

const controllers = {}

controllers.hlmTambahRPS = async (req, res) => {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
        return res.status(200).json("tidak ada token")
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id = payload.id
    const nama = payload.nama
    const NIP = payload.NIP
    res.render("dosen_tambahmatkul", {nama, NIP})
}

controllers.hlmRevisiRPS = async (req, res) => {
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

    const RPS = await models.course_plans.findOne({
        where : {
            id : req.params.idEdit
        }
    })
    res.render("dosen_revisirps", {RPS, idEdit, nama, NIP})
    
}

controllers.tambahRPS = async (req, res) => {
    const RPS = await models.course_plans.findOne({
        where : {
            course_id : req.body.course_id
        }
    })
    if (RPS)
        return res.status(200).json("Tidak dapat menambahkan RPS yang sudah tersedia")
    const {course_id, code, name, alias_name, credit, semester, description} = req.body
    try {
        await models.course_plans.create({
            course_id       : req.body.course_id,
            rev             : 0,
            code            : req.body.code,
            name            : req.body.name,
            alias_name      : req.body.alias_name,
            credit          : req.body.credit,
            semester        : req.body.semester,
            description     : req.body.description
        })
        res.status(200).redirect("/semuaMatkul")
    } catch (err) {
        console.log(err);
    }
}

// controllers.lihatRPS = async (req, res) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if(token == null) 
    //     return res.sendStatus(401);
        
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if(err) return res.sendStatus(403);
    //         req.id      = decoded.id;
    //         req.email   = decoded.email;
    //         req.nama    = decoded.nama;
    //         req.type    = decoded.type;
    // })
    // const dosenID = req.id

    // const RPS = await models.course_plans.findAll({
    //     include : [{
    //         model : models.course_plan_lecturers,
    //         // as  : 'dosen',
    //         attribute : [[]],
    //         where : {
    //             lecturer_id : dosenID
    //         }
    //     }]
    // })
   // const RPS = await models.course_plans.findAll({})
     //res.status(200).json(RPS)
//}

controllers.lihatRPS = async (req, res) => {
    const accessToken = req.cookies.accessToken 
    if (!accessToken)
        res.render("loginDosen")
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const id_dosen = payload.id
    const nama = payload.nama
    const NIP = payload.NIP

    const id = req.params.id
    const name = req.params.name
    const RPS = await models.course_plans.findAll({
        where : {
            course_plan_id : req.params.course_plan_id
        }
    })
    res.render("dosen_matakuliah", {RPS, nama, NIP})
}

controllers.revisiRPS = async (req, res) => {
    try {
        const idEdit = req.params.idEdit
        const accessToken = req.cookies.accessToken 
        if (!accessToken)
            return res.status(200).json("tidak ada token")
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const id_dosen = payload.id
        const nama = payload.nama
        const NIP = payload.NIP

        await models.course_plans.update({
            course_plan_id  : req.params.id,
            course_plan_name  : req.params.name,
            alias_name      : req.body.alias_name,
            credit          : req.body.credit,
            semester        : req.body.semester,
            description     : req.body.description
        },{
            where : {id : req.params.idEdit}
        })
        res.status(200).redirect("/semuaMatkul/"+course_plan_id+"/"+course_plan_name)
    } catch (err) {
        console.log(err);
    }
}

module.exports = controllers