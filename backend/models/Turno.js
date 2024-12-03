// models/Turno.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Paciente = require('./Paciente');

const Turno = sequelize.define('Turno', {
    tur_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pac_id: { type: DataTypes.INTEGER, references: { model: Paciente, key: 'pac_id' }, allowNull: false },
    tur_fecha: { type: DataTypes.DATE, allowNull: false },
    tur_motivo: { type: DataTypes.STRING, allowNull: false },
    tur_estado: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
    tableName: 'turno',
    timestamps: false
});

module.exports = Turno;
