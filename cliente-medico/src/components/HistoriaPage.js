import React, { useEffect, useState } from 'react';
import { getHistorias, createHistoria, updateHistoria } from '../controllers/HistoriaController';
import { getTurnos, updateTurno } from '../controllers/TurnoController';  // Agregar updateTurno
import { getPacientes } from '../controllers/PacienteController';

const HistoriaPage = () => {
    const [historias, setHistorias] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedTurno, setSelectedTurno] = useState(null); // Turno seleccionado
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        pac_id: '',
        his_fecha: '',
        his_descripcion: '',
        his_observacion: ''
    });

    useEffect(() => {
        const fetchTurnos = async () => {
            const data = await getTurnos();
            setTurnos(data.filter(turno => turno.tur_estado === true)); // Filtrar turnos habilitados
        };
        fetchTurnos();

        const fetchPacientes = async () => {
            const data = await getPacientes();
            setPacientes(data); // Guardar pacientes
        };
        fetchPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTurno) {
            alert('Debe seleccionar un turno antes de enviar la historia clínica.');
            return;
        }

        // Crear la historia clínica con los datos del turno seleccionado
        const historiaData = {
            pac_id: selectedTurno.pac_id, // Usar el pac_id del turno seleccionado
            his_fecha: new Date().toISOString(), // Usar la fecha actual
            his_descripcion: formData.his_descripcion,
            his_observacion: formData.his_observacion
        };

        try {
            if (editing) {
                await updateHistoria(editing, historiaData);
            } else {
                await createHistoria(historiaData);
            }

            // Cambiar el estado del turno a false
            await updateTurno(selectedTurno.tur_id, { tur_estado: false });

            // Resetear el formulario y actualizar los datos
            setFormData({
                pac_id: '',
                his_fecha: '',
                his_descripcion: '',
                his_observacion: ''
            });
            setEditing(null);
            setSelectedTurno(null); // Limpiar el turno seleccionado
            const data = await getHistorias();
            setHistorias(data);

            const turnosActualizados = await getTurnos(); // Refrescar la lista de turnos
            setTurnos(turnosActualizados.filter(turno => turno.tur_estado === true));
        } catch (error) {
            console.error('Error al enviar la historia clínica:', error);
            alert('Hubo un error al enviar la historia clínica.');
        }
    };

    const handleSelectTurno = (e) => {
        const turnoId = e.target.value;
        const turno = turnos.find((t) => t.tur_id.toString() === turnoId);
        setSelectedTurno(turno || null); // Actualizar el turno seleccionado

        if (turno) {
            setFormData({
                ...formData,
                pac_id: turno.pac_id,
                his_fecha: turno.tur_fecha
            });
        }
    };

    const getPacienteNameById = (pac_id) => {
        const paciente = pacientes.find(paciente => paciente.pac_id === pac_id);
        return paciente ? `${paciente.pac_nombre} ${paciente.pac_apellido}` : 'Paciente no encontrado';
    };

    return (
        <div>
            <h1>Historias</h1>
            <form onSubmit={handleSubmit}>
                {/* Dropdown de turnos */}
                <select
                    name="tur_id"
                    onChange={handleSelectTurno}
                    required
                >
                    <option value="">Seleccione un turno</option>
                    {turnos.map((turno) => (
                        <option key={turno.tur_id} value={turno.tur_id}>
                            {getPacienteNameById(turno.pac_id)} - {turno.tur_fecha}
                        </option>
                    ))}
                </select>

                {/* Mostrar motivo del turno seleccionado */}
                {selectedTurno && (
                    <div>
                        <p><strong>Paciente:</strong> {getPacienteNameById(selectedTurno.pac_id)}</p>
                        <p><strong>Motivo:</strong> {selectedTurno.tur_motivo}</p>
                    </div>
                )}

                <textarea
                    name="his_descripcion"
                    value={formData.his_descripcion}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Descripción"
                    required
                />
                <textarea
                    name="his_observacion"
                    value={formData.his_observacion}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Observaciones"
                />
                <button type="submit">{editing ? 'Actualizar' : 'Crear Historia'}</button>
            </form>
            <ul>
                {historias.map((his) => (
                    <li key={his.his_id}>
                        {his.his_fecha}: {his.his_descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoriaPage;
