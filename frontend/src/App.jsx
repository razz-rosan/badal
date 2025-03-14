import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HospitalDashboard from './pages/HospitalDashboard';
import PatientList from './pages/PatientList';
import PatientDetail from './pages/PatientDetail';
import ResearcherDashboard from './pages/ResearcherDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Hospital Routes */}
        <Route 
          path="/hospital" 
          element={
            <PrivateRoute role="hospital">
              <HospitalDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patients" 
          element={
            <PrivateRoute role="hospital">
              <PatientList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patients/:id" 
          element={
            <PrivateRoute role="hospital">
              <PatientDetail />
            </PrivateRoute>
          } 
        />
        
        {/* Researcher Routes */}
        <Route 
          path="/researcher" 
          element={
            <PrivateRoute role="researcher">
              <ResearcherDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
