// routes/turnos.js
const express = require('express');
const Turno = require('../models/Turno');
const router = express.Router();

// Crear turno
router.post('/', async (req, res) => {
    try {
        const turno = await Turno.create(req.body);
        res.json(turno);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
