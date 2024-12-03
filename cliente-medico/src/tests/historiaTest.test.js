const {
    getHistorias,
    createHistoria,
    updateHistoria,
    deleteHistoria
} = require('../controllers/HistoriaController');

// Mock de la función `api` que los controladores utilizan
jest.mock('../api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

const api = require('../api'); // Importar el mock

describe('HistoriaController', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    test('debe obtener todas las historias', async () => {
        const mockData = [
            { his_id: 1, his_descripcion: 'Historia 1' },
            { his_id: 2, his_descripcion: 'Historia 2' },
        ];
        api.get.mockResolvedValueOnce({ data: mockData });

        const historias = await getHistorias();

        expect(api.get).toHaveBeenCalledWith('/historia');
        expect(historias).toEqual(mockData);
    });

    test('debe crear una nueva historia', async () => {
        const nuevaHistoria = { his_descripcion: 'Nueva historia' };
        const mockResponse = { his_id: 3, ...nuevaHistoria };
        api.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await createHistoria(nuevaHistoria);

        expect(api.post).toHaveBeenCalledWith('/historia', nuevaHistoria);
        expect(result).toEqual(mockResponse);
    });

    test('debe actualizar una historia', async () => {
        const id = 1;
        const historiaActualizada = { his_descripcion: 'Historia actualizada' };
        const mockResponse = { his_id: id, ...historiaActualizada };
        api.put.mockResolvedValueOnce({ data: mockResponse });

        const result = await updateHistoria(id, historiaActualizada);

        expect(api.put).toHaveBeenCalledWith(`/historia/${id}`, historiaActualizada);
        expect(result).toEqual(mockResponse);
    });

    test('debe eliminar una historia', async () => {
        const id = 1;
        api.delete.mockResolvedValueOnce({ data: { success: true } });

        const result = await deleteHistoria(id);

        expect(api.delete).toHaveBeenCalledWith(`/historia/${id}`);
        expect(result).toEqual({ success: true });
    });

    test('debe manejar errores al obtener historias', async () => {
        api.get.mockRejectedValueOnce(new Error('Error de servidor'));

        await expect(getHistorias()).rejects.toThrow('Error de servidor');
        expect(api.get).toHaveBeenCalledWith('/historia');
    });

    test('debe manejar errores al crear una historia', async () => {
        const nuevaHistoria = { his_descripcion: 'Nueva historia' };
        api.post.mockRejectedValueOnce(new Error('Error al crear historia'));

        await expect(createHistoria(nuevaHistoria)).rejects.toThrow('Error al crear historia');
        expect(api.post).toHaveBeenCalledWith('/historia', nuevaHistoria);
    });

    test('debe manejar errores al actualizar una historia', async () => {
        const id = 1;
        const historiaActualizada = { his_descripcion: 'Historia actualizada' };
        api.put.mockRejectedValueOnce(new Error('Error al actualizar historia'));

        await expect(updateHistoria(id, historiaActualizada)).rejects.toThrow('Error al actualizar historia');
        expect(api.put).toHaveBeenCalledWith(`/historia/${id}`, historiaActualizada);
    });

    test('debe manejar errores al eliminar una historia', async () => {
        const id = 1;
        api.delete.mockRejectedValueOnce(new Error('Error al eliminar historia'));

        await expect(deleteHistoria(id)).rejects.toThrow('Error al eliminar historia');
        expect(api.delete).toHaveBeenCalledWith(`/historia/${id}`);
    });
});
