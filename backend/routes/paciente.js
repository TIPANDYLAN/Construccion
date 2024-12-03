// routes/pacientes.js
const express = require('express');
const Paciente = require('../models/Paciente');
const router = express.Router();

// Crear paciente
router.post('/', async (req, res) => {
    try {
        const paciente = await Paciente.create(req.body);
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer pacientes
router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar paciente
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.update(req.body, { where: { pac_id: id } });
        res.json({ message: 'Paciente actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar paciente
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.destroy({ where: { pac_id: id } });
        res.json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
