'use strict'
const { Sequelize, DataTypes, err } = require('sequelize');
const db = require('../config/koneksi.js')
var courses = db.define('courses', {
    id : {
        type        : DataTypes.BIGINT,
        allowNull       : false,
        primaryKey      : true,
        autoIncrement   : true
    },
    curriculum_id :  {
        type        : DataTypes.BIGINT,
        allowNull   : false,
        primaryKey  : false
    },
    alias_name : {
        type        : DataTypes.TEXT,
        allowNull   : true
    },
    description : {
        type        : DataTypes.TEXT,
        allowNull   : true
    },
    code        : Sequelize.STRING,
    name        : Sequelize.TEXT,
    credit      : Sequelize.INTEGER,
    semester    : Sequelize.INTEGER,

},{
    freezeTableName : true,
    timestamps      : false
})

module.exports = courses