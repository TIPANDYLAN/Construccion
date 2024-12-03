// models/Paciente.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Paciente = sequelize.define('Paciente', {
    pac_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pac_nombre: { type: DataTypes.STRING, allowNull: false },
    pac_apellido: { type: DataTypes.STRING, allowNull: false },
    pac_cedula: { type: DataTypes.STRING, unique: true, allowNull: false },
    pac_nacimiento: { type: DataTypes.DATE, allowNull: false },
    pac_telefono: { type: DataTypes.STRING },
    pac_email: { type: DataTypes.STRING },
    pac_direccion: { type: DataTypes.TEXT }
}, {
    tableName: 'paciente',
    timestamps: false
});

module.exports = Paciente;
