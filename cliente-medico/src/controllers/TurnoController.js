// controllers/TurnoController.js
import api from '../api';

// Obtener todos los turnos
export const getTurnos = async () => {
    try {
        const response = await api.get('/turno');
        return response.data;
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        throw error;
    }
};

// Crear un nuevo turno
export const createTurno = async (turno) => {
    try {
        const response = await api.post('/turno', turno);
        return response.data;
    } catch (error) {
        console.error('Error al crear turno:', error);
        throw error;
    }
};

// Actualizar un turno
export const updateTurno = async (id, turno) => {
    try {
        const response = await api.put(`/turno/${id}`, turno);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar turno:', error);
        throw error;
    }
};

// Eliminar un turno
export const deleteTurno = async (id) => {
    try {
        const response = await api.delete(`/turno/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar turno:', error);
        throw error;
    }
};
