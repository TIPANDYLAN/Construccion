import React, { useEffect, useState } from 'react';
import { getHistorias, createHistoria, updateHistoria, deleteHistoria } from '../controllers/HistoriaController';

const HistoriaPage = () => {
    const [historias, setHistorias] = useState([]);
    const [formData, setFormData] = useState({
        pac_id: '',
        his_fecha: '',
        his_descripcion: '',
        his_observacion: ''
    });
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchHistorias = async () => {
            const data = await getHistorias();
            setHistorias(data);
        };
        fetchHistorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateHistoria(editing, formData);
        } else {
            await createHistoria(formData);
        }
        setFormData({
            pac_id: '',
            his_fecha: '',
            his_descripcion: '',
            his_observacion: ''
        });
        setEditing(null);
        const data = await getHistorias();
        setHistorias(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar historia?')) {
            await deleteHistoria(id);
            const data = await getHistorias();
            setHistorias(data);
        }
    };

    const handleEdit = (historia) => {
        setFormData(historia);
        setEditing(historia.his_id);
    };

    return (
        <div>
            <h1>Historias</h1>
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
                    type="date"
                    name="his_fecha"
                    value={formData.his_fecha}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    required
                />
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
                <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
            </form>
            <ul>
                {historias.map((his) => (
                    <li key={his.his_id}>
                        {his.his_fecha}: {his.his_descripcion}{' '}
                        <button onClick={() => handleEdit(his)}>Editar</button>
                        <button onClick={() => handleDelete(his.his_id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoriaPage;
