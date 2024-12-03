import React, { useEffect, useState } from 'react';
import { getPacientes, createPaciente, updatePaciente } from '../controllers/PacienteController';
import { useNavigate } from 'react-router-dom';

const PacientePage = () => {
    const [ , setPacientes] = useState([]);
    const [formData, setFormData] = useState({
        pac_nombre: '',
        pac_apellido: '',
        pac_cedula: '',
        pac_nacimiento: '',
        pac_telefono: '',
        pac_email: '',
        pac_direccion: ''
    });
    const [editing, setEditing] = useState(null);
    const [turnoRegistrado, setTurnoRegistrado] = useState(false); // Estado para controlar el mensaje
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const fetchPacientes = async () => {
            const data = await getPacientes();
            setPacientes(data);
        };
        fetchPacientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updatePaciente(editing, formData);
        } else {
            await createPaciente(formData);
        }
        setFormData({
            pac_nombre: '',
            pac_apellido: '',
            pac_cedula: '',
            pac_nacimiento: '',
            pac_telefono: '',
            pac_email: '',
            pac_direccion: ''
        });
        setEditing(null);
        const data = await getPacientes();
        setPacientes(data);

        // Mostrar el mensaje de turno registrado
        setTurnoRegistrado(true);

        // Redirigir después de 3 segundos
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div>
            {!turnoRegistrado ? (
                <div className="Formulario">
                    <h1>Pacientes</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="pac_nombre"
                            value={formData.pac_nombre}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Nombre"
                            required
                        />
                        <input
                            type="text"
                            name="pac_apellido"
                            value={formData.pac_apellido}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Apellido"
                            required
                        />
                        <input
                            type="text"
                            name="pac_cedula"
                            value={formData.pac_cedula}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Cédula"
                            required
                        />
                        <input
                            type="date"
                            name="pac_nacimiento"
                            value={formData.pac_nacimiento}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="pac_telefono"
                            value={formData.pac_telefono}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Teléfono"
                        />
                        <input
                            type="email"
                            name="pac_email"
                            value={formData.pac_email}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Email"
                        />
                        <textarea
                            name="pac_direccion"
                            value={formData.pac_direccion}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            placeholder="Dirección"
                        />
                        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
                    </form>
                    <label>¿Ya estas registrado? Inicia sesión en &nbsp;
                        <a href="/login">Iniciar Sesión</a>
                    </label>
                </div>
            ) : (
                <div>
                    <h1>¡Su turno ha sido registrado!</h1>
                    <p>Será redirigido a la página principal en unos segundos... </p>
                </div>
            )}
        </div>
    );
};

export default PacientePage;
