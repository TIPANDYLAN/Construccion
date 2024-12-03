// models/Historia.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Paciente = require('./Paciente');

const Historia = sequelize.define('Historia', {
    his_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pac_id: { type: DataTypes.INTEGER, references: { model: Paciente, key: 'pac_id' }, allowNull: false },
    his_fecha: { type: DataTypes.DATE, allowNull: false },
    his_descripcion: { type: DataTypes.TEXT, allowNull: false },
    his_observacion: { type: DataTypes.TEXT }
}, {
    tableName: 'historia',
    timestamps: false
});

module.exports = Historia;
