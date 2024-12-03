import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import PacientePage from './components/PacientePage';
import HistoriaPage from './components/HistoriaPage';
import TurnoPage from './components/TurnoPage';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';

function App() {
    return (
      <Router>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='registro' element={<PacientePage />} />
            <Route path='historias' element={<HistoriaPage />} />
            <Route path='turnos' element={<TurnoPage />} />
            <Route path='login' element={<LoginPage />} />
        </Routes>
      </Router>
    );
};

export default App;
