'use strict'
const {Sequelize, DataTypes, err} = require('sequelize')
const db = require('../config/koneksi.js')

var permissions = db.define('permissions', {
    id : {
        type        : DataTypes.BIGINT,
        allowNull   : false,
        primaryKey  : true
    },
    name        : Sequelize.STRING,
    guard_name  : Sequelize.STRING

},{
    freezeTableName : true,
    timestamps      : false
})

module.exports = permissions