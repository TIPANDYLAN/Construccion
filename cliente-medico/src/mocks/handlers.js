// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    // Obtener todos los turnos
    rest.get('/turno', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            { id: 1, nombre: 'Turno 1' },
            { id: 2, nombre: 'Turno 2' },
        ]));
    }),

    // Crear un nuevo turno
    rest.post('/turno', (req, res, ctx) => {
        const nuevoTurno = req.body;
        return res(ctx.status(201), ctx.json({ id: 3, ...nuevoTurno }));
    }),

    // Actualizar un turno
    rest.put('/turno/:id', (req, res, ctx) => {
        const { id } = req.params;
        const datosActualizados = req.body;
        return res(ctx.status(200), ctx.json({ id, ...datosActualizados }));
    }),

    // Eliminar un turno
    rest.delete('/turno/:id', (req, res, ctx) => {
        const { id } = req.params;
        return res(ctx.status(200), ctx.json({ success: true }));
    }),
];
