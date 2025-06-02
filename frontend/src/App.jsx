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
import EditProfilePage from './pages/EditProfilePage';
import EnterpriseProfilePage from './pages/EnterpriseProfilePage';
import EditEnterpriseProfilePage from './pages/EditEnterpriseProfilePage';
import AddJobOfferPage from './pages/AddJobOfferPage';
import EditJobOfferPage from './pages/EditJobOfferPage';
import PostularPage from './pages/PostularPage';
import CVGenerator from './pages/CVGenerator';

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
  <Route path="/editar-perfil" element={<EditProfilePage />} />
  <Route path="/perfil-empresa" element={<EnterpriseProfilePage />} />
  <Route path="/editar-perfil-empresa" element={<EditEnterpriseProfilePage />} />
  <Route path="/añadir-oferta" element={<AddJobOfferPage />} />
  <Route path="/editar-oferta/:id" element={<EditJobOfferPage />} />
  <Route path="/postular/:id" element={<PostularPage />} />
  <Route path="generador-cv" element={<CVGenerator />} />
  generador-cv
  
</Routes>
        <Footer />
      </div>
    </ModeProvider>
  );
}

export default App;
