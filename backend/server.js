const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./db');

const pacientesRoutes = require('./routes/paciente');
const historiasRoutes = require('./routes/historias');
const turnosRoutes = require('./routes/turnos');
const loginRoutes = require('./routes/login');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/paciente', pacientesRoutes);
app.use('/api/historia', historiasRoutes);
app.use('/api/turno', turnosRoutes);
app.use('/api/login', loginRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
});
