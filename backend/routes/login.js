// routes/pacientes.js
const express = require('express');
const Paciente = require('../models/Paciente');
const router = express.Router();

// Login paciente (verificación con email y fecha de nacimiento)
router.post('/', async (req, res) => {
    const { email, pac_nacimiento } = req.body;

    try {
        // Buscar paciente por correo
        const paciente = await Paciente.findOne({
            where: {
                pac_email: email // Asegúrate de que el correo esté dentro de "where"
            }
        });
        

        if (!paciente) {
            return res.status(400).json({ error: 'Correo no encontrado' });
        }

        // Comparar fecha de nacimiento
        if (paciente.pac_nacimiento !== pac_nacimiento) {
            return res.status(400).json({ error: 'Fecha de nacimiento incorrecta' });
        }

        // Si el login es exitoso, generar un token JWT
        const token = jwt.sign({ pacienteId: paciente._id }, 'secret_key', { expiresIn: '1h' });

        // Enviar respuesta con el token
        res.json({ token, paciente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
