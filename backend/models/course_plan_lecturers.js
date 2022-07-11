'use strict'
const { Sequelize, DataTypes, err } = require('sequelize');
const db = require('../config/koneksi.js')

var course_plan_lecturers = db.define('course_plan_lecturers', {
        id : {
          type : DataTypes.BIGINT,
          allownull : false,
          primaryKey : true,
          autoIncrement : true
        },

        course_plan_id : {
            type : DataTypes.BIGINT,
            allownull : false

        },

        lecturer_id : {
            type : DataTypes.BIGINT,
            allownull : false,

        },

        creator : {
            type : DataTypes.INTEGER,
            allownull : false
        },

},{
    freezeTableName : true,
    timestamps      : false
})

module.exports = course_plan_lecturers



