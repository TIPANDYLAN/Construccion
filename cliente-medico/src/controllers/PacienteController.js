// controllers/PacienteController.js
import api from '../api';

// Obtener todos los pacientes
export const getPacientes = async () => {
    try {
        const response = await api.get('/paciente');
        return response.data;
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        if (error.response) {
            // Si el servidor responde con un error (por ejemplo, 500)
            throw new Error(`Error del servidor: ${error.response.statusText}`);
        } else if (error.request) {
            // Si no hay respuesta del servidor
            throw new Error('No se recibió respuesta del servidor.');
        } else {
            // Errores en la configuración de la solicitud
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
};
// Crear un nuevo paciente
export const createPaciente = async (paciente) => {
    try {
        // Validación simple de los datos antes de enviarlos
        if (!paciente.pac_nombre || !paciente.pac_apellido || !paciente.pac_cedula || !paciente.pac_nacimiento) {
            throw new Error('Faltan campos obligatorios');
        }

        const response = await api.post('/paciente', paciente);
        return response.data;
    } catch (error) {
        console.error('Error al crear paciente:', error);
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor.');
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
};
// Actualizar un paciente
export const updatePaciente = async (id, paciente) => {
    try {
        if (!id) {
            throw new Error('ID del paciente es necesario para actualizar');
        }
        if (!paciente.pac_nombre || !paciente.pac_apellido || !paciente.pac_cedula || !paciente.pac_nacimiento) {
            throw new Error('Faltan campos obligatorios');
        }

        const response = await api.put(`/paciente/${id}`, paciente);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor.');
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
};
// Eliminar un paciente
export const deletePaciente = async (id) => {
    try {
        if (!id) {
            throw new Error('ID del paciente es necesario para eliminar');
        }

        const response = await api.delete(`/paciente/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor.');
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
};

export const loginUsuario = async (formData) => {
    try {
        const response = await api.post('/login', formData);
        return response.data;
    } catch (error) {
        console.error('Error al crear paciente:', error);
        if (error.response) {
            throw new Error(`Error del servidor: ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor.');
        } else {
            throw new Error(`Error en la solicitud: ${error.message}`);
        }
    }
};
export const getPacienteByEmail = async (email) => {
    try {
        const response = await api.get(`/paciente/${email}`);
        return response.data;  // Devuelve los datos del paciente
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        throw error;  // Lanza el error si la solicitud falla
    }
};
export const getPacienteById = async (id) => {
    try {
        const response = await api.get(`/paciente/${id}`);
        return response.data;  // Devuelve los datos del paciente
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        throw error;  // Lanza el error si la solicitud falla
    }
};