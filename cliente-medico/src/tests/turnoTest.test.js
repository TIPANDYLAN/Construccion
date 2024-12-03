const { getTurnos, createTurno, updateTurno, deleteTurno } = require('../controllers/TurnoController');

// Mock de la función `api` que los controladores utilizan
jest.mock('../api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

const api = require('../api'); // Importar el mock

describe('TurnoController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    test('debe obtener todos los turnos', async () => {
        const mockData = [
            { id: 1, nombre: 'Turno 1' },
            { id: 2, nombre: 'Turno 2' },
        ];
        api.get.mockResolvedValueOnce({ data: mockData });

        const turnos = await getTurnos();

        expect(api.get).toHaveBeenCalledWith('/turno');
        expect(turnos).toEqual(mockData);
    });

    test('debe crear un nuevo turno', async () => {
        const nuevoTurno = { nombre: 'Turno Nuevo' };
        const mockResponse = { id: 3, nombre: 'Turno Nuevo' };
        api.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await createTurno(nuevoTurno);

        expect(api.post).toHaveBeenCalledWith('/turno', nuevoTurno);
        expect(result).toEqual(mockResponse);
    });

    test('debe actualizar un turno', async () => {
        const id = 1;
        const turnoActualizado = { nombre: 'Turno Actualizado' };
        const mockResponse = { id, ...turnoActualizado };
        api.put.mockResolvedValueOnce({ data: mockResponse });

        const result = await updateTurno(id, turnoActualizado);

        expect(api.put).toHaveBeenCalledWith(`/turno/${id}`, turnoActualizado);
        expect(result).toEqual(mockResponse);
    });

    test('debe eliminar un turno', async () => {
        const id = 1;
        api.delete.mockResolvedValueOnce({ data: { success: true } });

        const result = await deleteTurno(id);

        expect(api.delete).toHaveBeenCalledWith(`/turno/${id}`);
        expect(result).toEqual({ success: true });
    });

    test('debe manejar errores al obtener turnos', async () => {
        api.get.mockRejectedValueOnce(new Error('Error de servidor'));

        await expect(getTurnos()).rejects.toThrow('Error de servidor');
        expect(api.get).toHaveBeenCalledWith('/turno');
    });
});
