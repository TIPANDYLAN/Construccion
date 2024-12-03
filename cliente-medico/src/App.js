import React from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import PacientePage from './components/RegistroPage';
import HistoriaPage from './components/HistoriaPage';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import './App.css';
import espe from './assets/espe.png';

function App() {
    return (
      <Router>
        <div className='Header'>
          <img src={espe} alt='logo' className='Logo' />
          Gestión de Enfermería
        </div>
        <div className='App'>
          <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='registro' element={<PacientePage />} />
              <Route path='historias' element={<HistoriaPage />} />
              <Route path='login' element={<LoginPage />} />
          </Routes>
        </div>
        <div className='Footer'>
          Acceso a &nbsp; <Link to='/historias' className='link'>Historias</Link>
        </div>
      </Router>
    );
};

export default App;
