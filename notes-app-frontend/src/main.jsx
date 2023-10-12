import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './routes/dashboard.jsx'
import Login from './routes/login.jsx'
import Signup from './routes/signup.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import { AutoProvider } from './auth/AuthProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AutoProvider>
      <RouterProvider router={router} />
    </AutoProvider>
  </React.StrictMode>,
)
