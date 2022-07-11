const { Sequelize, DataTypes, err } = require('sequelize');
const db = require('../config/koneksi.js')

var curriculum_los = db.define('curriculum_los', {
    id : {
        type : DataTypes.BIGINT,
        allownull : false,
        primaryKey : true,
        autoIncrement : true
    },

    curriculum_id : {
        type : DataTypes.BIGINT,
        allownull : false
    },

    code : {
        type : DataTypes.STRING,
        allownull : false
    },

    name : {
        type : DataTypes.TEXT,
        allownull : false
    },

    type : {
        type : DataTypes.INTEGER,
        allownull : false
    },

    description : {
        type : DataTypes.TEXT,
        allownull : true
    },

},{
    freezeTableName : true,
    timestamps      : false
})

module.exports = curriculum_los

