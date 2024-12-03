// routes/historias.js
const express = require('express');
const Historia = require('../models/Historia');
const router = express.Router();

// Crear historia
router.post('/', async (req, res) => {
    try {
        const historia = await Historia.create(req.body);
        res.json(historia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Leer historias
router.get('/', async (req, res) => {
    try {
        const historias = await Historia.findAll();
        res.json(historias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar historia
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Historia.update(req.body, { where: { pac_id: id } });
        res.json({ message: 'Historia actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar historia
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Historia.destroy({ where: { pac_id: id } });
        res.json({ message: 'Historia eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
