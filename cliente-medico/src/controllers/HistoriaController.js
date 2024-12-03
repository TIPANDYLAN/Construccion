// controllers/HistoriaController.js
import api from '../api';

// Obtener todas las historias
export const getHistorias = async () => {
    try {
        const response = await api.get('/historia');
        return response.data;
    } catch (error) {
        console.error('Error al obtener historias:', error);
        throw error;
    }
};

// Crear una nueva historia
export const createHistoria = async (historia) => {
    try {
        const response = await api.post('/historia', historia);
        return response.data;
    } catch (error) {
        console.error('Error al crear historia:', error);
        throw error;
    }
};

// Actualizar una historia
export const updateHistoria = async (id, historia) => {
    try {
        const response = await api.put(`/historia/${id}`, historia);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar historia:', error);
        throw error;
    }
};

// Eliminar una historia
export const deleteHistoria = async (id) => {
    try {
        const response = await api.delete(`/historia/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar historia:', error);
        throw error;
    }
};
