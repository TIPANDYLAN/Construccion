// main.js
import React from 'react';
import {  Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className='Main'>
            <h1>¿Quieres sacar turno?</h1>
            <button>
                <Link to="/registro" className='link'>Registrarse</Link>
            </button>
        </div>
    );
};

export default MainPage;
