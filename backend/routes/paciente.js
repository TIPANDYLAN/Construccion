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


// Obtener paciente por email (nuevo controlador)
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;  // Obtener el email desde los parámetros de la URL
        const paciente = await Paciente.findOne({ where: { pac_email: email } });  // Buscar el paciente por email

        if (paciente) {
            res.json(paciente);  // Si el paciente es encontrado, devolverlo
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });  // Si no se encuentra el paciente
        }
    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
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
