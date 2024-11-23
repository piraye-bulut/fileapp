// src/routes/AllRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home'; // Home bileşenini import edin
import { Signup } from '../pages/Signup'; // Signup bileşenini import edin
import { LoginPage } from '../pages/LoginPage'; // LoginPage bileşenini import edin
import { Dashboard } from '../pages/Dashboard'; // Dashboard bileşenini import edin
import { SendFile } from '../pages/SendFile'; // SendFile bileşenini import edin
import { ReceivedFiles } from '../pages/ReceivedFiles'; // ReceivedFiles bileşenini import edin
import ProtectedRoute from '../components/ProtectedRoute'; // ProtectedRoute bileşenini import edin

// Uygulama rotalarını belirten AllRoutes fonksiyonu
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Başlangıç sayfası */}
      <Route path="/signup" element={<Signup />} /> {/* Kayıt sayfası */}
      <Route path="/login" element={<LoginPage />} /> {/* Giriş sayfası */}
      
      {/* ProtectedRoute ile korunan yollar */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard sayfası */}
        <Route path="/sendfile" element={<SendFile />} /> {/* Dosya gönderim sayfası */}
        <Route path="/receivedfiles" element={<ReceivedFiles />} /> {/* Alınan dosyalar sayfası */}
      </Route>
    </Routes>
  );
};