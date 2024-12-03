import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../controllers/PacienteController'; // Asume que tienes un controlador de login

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        pac_nacimiento: '' // Cambiamos la contraseña por la fecha de nacimiento
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegación

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await loginUsuario(formData); // Llama a la función de login
            if (user) {
                // Si la fecha de nacimiento es correcta, redirige al usuario
                navigate('/');
            } else {
                setErrorMessage('Correo o fecha de nacimiento incorrectos.');
            }
        } catch (error) {
            setErrorMessage('Hubo un error al intentar iniciar sesión.');
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
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
                <button type="submit">Iniciar sesión</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
