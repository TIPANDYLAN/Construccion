const {
    getPacientes,
    createPaciente,
    updatePaciente,
    deletePaciente,
    loginUsuario,
    getPacienteByEmail,
    getPacienteById
} = require('../controllers/PacienteController');

// Mock de la función `api` que los controladores utilizan
jest.mock('../api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

const api = require('../api'); // Importar el mock

describe('PacienteController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    test('debe obtener todos los pacientes', async () => {
        const mockData = [
            { pac_id: 1, pac_nombre: 'Juan', pac_apellido: 'Perez' },
            { pac_id: 2, pac_nombre: 'Maria', pac_apellido: 'Lopez' },
        ];
        api.get.mockResolvedValueOnce({ data: mockData });

        const pacientes = await getPacientes();

        expect(api.get).toHaveBeenCalledWith('/paciente');
        expect(pacientes).toEqual(mockData);
    });

    test('debe crear un nuevo paciente', async () => {
        const nuevoPaciente = { pac_nombre: 'Pedro', pac_apellido: 'Gomez', pac_cedula: '123456', pac_nacimiento: '1990-01-01' };
        const mockResponse = { pac_id: 3, ...nuevoPaciente };
        api.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await createPaciente(nuevoPaciente);

        expect(api.post).toHaveBeenCalledWith('/paciente', nuevoPaciente);
        expect(result).toEqual(mockResponse);
    });

    test('debe actualizar un paciente', async () => {
        const id = 1;
        const pacienteActualizado = { pac_nombre: 'Juan', pac_apellido: 'Martinez', pac_cedula: '123456', pac_nacimiento: '1990-01-01' };
        const mockResponse = { pac_id: id, ...pacienteActualizado };
        api.put.mockResolvedValueOnce({ data: mockResponse });

        const result = await updatePaciente(id, pacienteActualizado);

        expect(api.put).toHaveBeenCalledWith(`/paciente/${id}`, pacienteActualizado);
        expect(result).toEqual(mockResponse);
    });

    test('debe eliminar un paciente', async () => {
        const id = 1;
        api.delete.mockResolvedValueOnce({ data: { success: true } });

        const result = await deletePaciente(id);

        expect(api.delete).toHaveBeenCalledWith(`/paciente/${id}`);
        expect(result).toEqual({ success: true });
    });

    test('debe manejar errores al obtener pacientes', async () => {
        api.get.mockRejectedValueOnce(new Error('Error de servidor'));

        await expect(getPacientes()).rejects.toThrow('Error de servidor');
        expect(api.get).toHaveBeenCalledWith('/paciente');
    });

    test('debe manejar errores al crear paciente', async () => {
        const nuevoPaciente = { pac_nombre: 'Pedro', pac_apellido: 'Gomez' }; // Falta el campo `pac_cedula` y `pac_nacimiento`
        
        // El controlador debería rechazar la promesa debido a la falta de campos obligatorios
        await expect(createPaciente(nuevoPaciente)).rejects.toThrow('Faltan campos obligatorios');
        expect(api.post).not.toHaveBeenCalled(); // No debería haberse llamado a api.post
    });
    

    test('debe manejar errores al actualizar paciente', async () => {
        const id = 1;
        const pacienteActualizado = { pac_nombre: 'Juan', pac_apellido: 'Martinez' }; // Falta el campo `pac_cedula` y `pac_nacimiento`
        
        // El controlador debería rechazar la promesa debido a la falta de campos obligatorios
        await expect(updatePaciente(id, pacienteActualizado)).rejects.toThrow('Faltan campos obligatorios');
        expect(api.put).not.toHaveBeenCalled(); // No debería haberse llamado a api.put
    });
    

    test('debe manejar errores al eliminar paciente', async () => {
        const id = 1;
        api.delete.mockRejectedValueOnce(new Error('Error al eliminar paciente')); // Simula el error
    
        await expect(deletePaciente(id)).rejects.toThrow('Error al eliminar paciente');
        expect(api.delete).toHaveBeenCalledWith(`/paciente/${id}`);
    });
    
    test('debe obtener paciente por email', async () => {
        const email = 'juan.perez@example.com';
        const mockData = { pac_id: 1, pac_nombre: 'Juan', pac_apellido: 'Perez' };
        api.get.mockResolvedValueOnce({ data: mockData });

        const paciente = await getPacienteByEmail(email);

        expect(api.get).toHaveBeenCalledWith(`/paciente/${email}`);
        expect(paciente).toEqual(mockData);
    });

    test('debe obtener paciente por id', async () => {
        const id = 1;
        const mockData = { pac_id: 1, pac_nombre: 'Juan', pac_apellido: 'Perez' };
        api.get.mockResolvedValueOnce({ data: mockData });

        const paciente = await getPacienteById(id);

        expect(api.get).toHaveBeenCalledWith(`/paciente/${id}`);
        expect(paciente).toEqual(mockData);
    });
});
