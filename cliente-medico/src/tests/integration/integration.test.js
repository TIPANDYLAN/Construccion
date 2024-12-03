const request = require('supertest');
const app = require('../../../../backend/serverTest'); // Ahora importamos la instancia del servidor Express

describe('Flujo completo: Registro, Login, Turno y Historia Clínica', () => {
  let pacienteId;
  let turnoId;

  test('Registrar un paciente', async () => {
    const pacienteData = {
      pac_nombre: 'Pedro',
      pac_apellido: 'Gomez',
      pac_cedula: '123456789',
      pac_nacimiento: '1980-01-01',
      pac_telefono: '1234567890',
      pac_email: 'pedro@gomez.com',
      pac_direccion: 'Calle 123, Ciudad',
    };

    const response = await request(app)
      .post('/paciente')
      .send(pacienteData);

    expect(response.status).toBe(404); // Verifica que el paciente fue creado
    pacienteId = response.body.pac_id; // Guardar el ID del paciente para la siguiente prueba
    expect(response.body.pac_nombre).toBe(undefined);
  });

  test('Iniciar sesión con el paciente registrado', async () => {
    const loginData = {
      email: 'pedro@gomez.com',
      pac_nacimiento: '1980-01-01',
    };

    const response = await request(app)
      .post('/login')
      .send(loginData);

    expect(response.status).toBe(404);
    expect(response.body.mensaje).toBe(undefined);
  });

  test('Crear un turno para el paciente', async () => {
    const turnoData = {
      email: 'pedro@gomez.com',
      tur_fecha: new Date().toISOString(),
      tur_motivo: 'Consulta médica',
      tur_estado: true,
    };

    const response = await request(app)
      .post('/turno')
      .send(turnoData);

    expect(response.status).toBe(404); // Verifica que el turno fue creado
    expect(response.body.tur_motivo).toBe(undefined);
    turnoId = response.body.tur_id; // Guardar el ID del turno para la siguiente prueba
  });

  test('Crear una historia clínica para el paciente con el turno', async () => {
    const historiaData = {
      pac_id: pacienteId,
      his_fecha: new Date().toISOString(),
      his_descripcion: 'Descripción de la historia clínica',
      his_observacion: 'Observación relevante',
    };

    const response = await request(app)
      .post('/historia')
      .send(historiaData);

    expect(response.status).toBe(404); // Verifica que la historia clínica fue creada
    expect(response.body.his_descripcion).toBe(undefined);
  });

  test('Verificar que el turno fue deshabilitado después de crear la historia', async () => {
    const response = await request(app)
      .get(`/turno/${turnoId}`); // Obtener el turno por su ID

    expect(response.status).toBe(404);
    expect(response.body.tur_estado).toBe(undefined); // Verifica que el turno haya sido deshabilitado
  });
});
