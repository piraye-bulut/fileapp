// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase yapılandırmanızı içe aktarın

// Kullanıcı doğrulamasına dayalı olarak bileşenleri yöneten ProtectedRoute fonksiyonu
export const ProtectedRoute = () => {
  const user = auth.currentUser;

  // Kullanıcı yoksa, giriş sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Kullanıcı varsa, bileşeni render et
  return <Outlet />;
};

export default ProtectedRoute;