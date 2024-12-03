const express = require('express');
const Paciente = require('../models/Paciente');
const router = express.Router();

// Login paciente (verificación con email y fecha de nacimiento)
router.post('/', async (req, res) => {
    const { email, pac_nacimiento } = req.body;

    try {
        // Validar si los campos email y pac_nacimiento están presentes
        if (!email || !pac_nacimiento) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Buscar paciente por correo
        const paciente = await Paciente.findOne({
            where: {
                pac_email: email // Buscar por correo
            }
        });

        if (!paciente) {
            return res.status(400).json({ error: 'Correo no encontrado' });
        }

        // Comparar fecha de nacimiento
        if (paciente.pac_nacimiento !== pac_nacimiento) {
            return res.status(400).json({ error: 'Fecha de nacimiento incorrecta' });
        }

        // Si las credenciales son correctas, enviar los datos del paciente
        res.json({ mensaje: 'Autenticación exitosa', paciente });
    } catch (error) {
        console.error(error); // Imprimir error en el servidor
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
