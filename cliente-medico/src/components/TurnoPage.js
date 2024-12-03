import React, { useEffect, useState } from 'react';
import { getTurnos, createTurno, updateTurno, deleteTurno } from '../controllers/TurnoController';

const TurnoPage = () => {
    const [turnos, setTurnos] = useState([]);
    const [formData, setFormData] = useState({
        pac_id: '',
        tur_fecha: '',
        tur_motivo: '',
        tur_estado: false
    });
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchTurnos = async () => {
            const data = await getTurnos();
            setTurnos(data);
        };
        fetchTurnos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateTurno(editing, formData);
        } else {
            await createTurno(formData);
        }
        setFormData({
            pac_id: '',
            tur_fecha: '',
            tur_motivo: '',
            tur_estado: false
        });
        setEditing(null);
        const data = await getTurnos();
        setTurnos(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar turno?')) {
            await deleteTurno(id);
            const data = await getTurnos();
            setTurnos(data);
        }
    };

    const handleEdit = (turno) => {
        setFormData(turno);
        setEditing(turno.tur_id);
    };

    return (
        <div>
            <h1>Turnos</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="pac_id"
                    value={formData.pac_id}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="ID del Paciente"
                    required
                />
                <input
                    type="datetime-local"
                    name="tur_fecha"
                    value={formData.tur_fecha}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    required
                />
                <input
                    type="text"
                    name="tur_motivo"
                    value={formData.tur_motivo}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Motivo del turno"
                    required
                />
                <label>
                    Estado:
                    <input
                        type="checkbox"
                        name="tur_estado"
                        checked={formData.tur_estado}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
                    />
                </label>
                <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {turnos.map((tur) => (
                    <li key={tur.tur_id}>
                        {tur.tur_fecha}: {tur.tur_motivo} ({tur.tur_estado ? 'Confirmado' : 'Cancelado'}){' '}
                        <button onClick={() => handleEdit(tur)}>Editar</button>
                        <button onClick={() => handleDelete(tur.tur_id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurnoPage;
