// main.js
import React from 'react';
import {  Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <h1>¿Quieres sacar turno?</h1>
            <button>
                <Link to="/pacientes">Ir a pacientes</Link>
            </button>
        </div>
    );
};

export default MainPage;
