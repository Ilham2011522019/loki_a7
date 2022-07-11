const { Sequelize, DataTypes, err } = require('sequelize');
const db = require('../config/koneksi.js')

var course_requirements = db.define('course_requirements', {
    id : {
        type : DataTypes.BIGINT,
        allownull : false,
        primaryKey : true,
        autoIncrement : true
    },

    course_id : {
        type : DataTypes.BIGINT,
        allownull : false
    },

    required_course_id : {
        type : DataTypes.BIGINT,
        allownull : false
    },

    required_level : {
        type : DataTypes.INTEGER,
        allownull : false
    },

},{
    freezeTableName : true,
    timestamps      : false
})

module.exports = course_requirements

