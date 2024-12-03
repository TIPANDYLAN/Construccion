import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../controllers/PacienteController'; // Asume que tienes un controlador de login
import { createTurno } from '../controllers/TurnoController'; // Asume que tienes un controlador para crear turnos

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        pac_nacimiento: '', // Fecha de nacimiento para el login
        motivo: '' // Motivo de consulta agregado
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegación

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await loginUsuario(formData); // Llama a la función de login
            if (user) {
                // Si el login es exitoso, creamos un turno
                const turnoData = {
                    email: formData.email, // ID del paciente (esto depende de lo que devuelva tu API)
                    tur_fecha: new Date().toISOString(), // La fecha y hora exacta de ahora
                    tur_motivo: formData.motivo,
                    tur_estado: true // El turno está siempre habilitado (confirmado)
                };

                await createTurno(turnoData); // Llama al controlador para crear un turno
                navigate('/'); // Redirige a la página principal
            } else {
                setErrorMessage('Correo o fecha de nacimiento incorrectos.');
            }
        } catch (error) {
            setErrorMessage('Hubo un error al intentar iniciar sesión.');
        }
    };

    return (
        <div className='login'>
            <h1>Solicitud de Turno</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Email"
                    required
                />
                <input
                    type="date"
                    name="pac_nacimiento"
                    value={formData.pac_nacimiento}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Fecha de nacimiento"
                    required
                />
                <input
                    type="text"
                    name="motivo"
                    value={formData.motivo}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Motivo de consulta"
                    required
                />
                <button type="submit">Envia el Turno</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <label>¿No estas registrado? Regístrese en &nbsp;
                        <a href="/registro">Registrarse</a>
                    </label>
        </div>
    );
};

export default LoginPage;
