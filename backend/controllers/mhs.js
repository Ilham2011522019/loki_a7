const models = require('../models/index')

const controllers = {}

controllers.home = async(req, res) => {
    const RPS = await models.course_plans.findAll({})
    res.render("beranda_awal", {RPS} )
}

controllers.detail = async(req, res) => {
    const RPS = await models.course_plans.findAll({
        where : {
            id : req.params.id
        }
    })
    res.render("beranda_awal", {RPS} )
}

controllers.cari = async (req, res) => {
    cari = req.query.cari

    const RPS = await models.course_plans.findAll({
        where : {
            [Op.or] : [
                {name : {[Op.like] : cari }},
                {code : {[Op.like] : cari}}
            ]
        }
    })
    res.render("beranda_awal", {RPS}) 
    // res.json({RPS})
}

module.exports = controllers