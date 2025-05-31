// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModeProvider } from './ModeContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EnterpriseJobOffersPage from './pages/EnterpriseJobOffersPage';
import EnterpriseMainPage from './pages/EnterpriseMainPage';

function App() {
  return (
    <ModeProvider>
      <div style={{ backgroundColor: '#212529', minHeight: '100vh' }}>
        <Header />
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/perfil" element={<ProfilePage />} />
  <Route path="/empleos" element={<JobsPage />} />
  <Route path="/empresas" element={<CompaniesPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/enterprise-main-page" element={<EnterpriseMainPage />} />
  <Route path="/misofertas" element={<EnterpriseJobOffersPage />} />
</Routes>
        <Footer />
      </div>
    </ModeProvider>
  );
}

export default App;
