import { Outlet, Navigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';


export default function ProtectedRoute() {
    const auth = useAuth();
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

