// routes/turnos.js
const express = require('express');
const Turno = require('../models/Turno');
const router = express.Router();
const Paciente = require('../models/Paciente');
// Crear turno
router.post('/', async (req, res) => {
    const { email, pac_nacimiento, tur_fecha, tur_motivo } = req.body;

    try {
        // Buscar paciente por correo
        const paciente = await Paciente.findOne({
            where: {
                pac_email: email // Buscar por correo
            }
        });


        // Si la autenticación es exitosa, crear el turno
        const turnoData = {
            pac_id: paciente.pac_id,  // Asocia el turno con el paciente autenticado
            tur_fecha: tur_fecha,  // Fecha del turno
            tur_motivo: tur_motivo,  // Motivo del turno
            tur_estado: true  // Turno habilitado
        };

        // Crear turno en la base de datos
        const turno = await Turno.create(turnoData);

        res.json({ mensaje: 'Turno creado exitosamente', turno });
    } catch (error) {
        console.error(error);  // Imprimir error en el servidor
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Leer turnos
router.get('/', async (req, res) => {
    try {
        const turnos = await Turno.findAll();
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar turno
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Turno.update(req.body, { where: { pac_id: id } });
        res.json({ message: 'Turno actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar turno
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Turno.destroy({ where: { pac_id: id } });
        res.json({ message: 'Turno eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
