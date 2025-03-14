import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../services/api';

const HospitalDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    geneticTests: 0,
    skinImages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPatients();
        
        // Calculate stats
        const patients = data.patients || [];
        let geneticCount = 0;
        let skinCount = 0;
        
        patients.forEach(patient => {
          geneticCount += patient.genetic_data_count || 0;
          skinCount += patient.skin_images_count || 0;
        });
        
        setStats({
          totalPatients: patients.length,
          geneticTests: geneticCount,
          skinImages: skinCount
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1>Hospital Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Patients</h2>
          <p className="stat-number">{stats.totalPatients}</p>
        </div>
        
        <div className="stat-card">
          <h2>Genetic Tests</h2>
          <p className="stat-number">{stats.geneticTests}</p>
        </div>
        
        <div className="stat-card">
          <h2>Skin Images</h2>
          <p className="stat-number">{stats.skinImages}</p>
        </div>
      </div>
      
      <div className="actions-container">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/patients" className="action-button">
            View Patients
          </Link>
          <Link to="/patients/new" className="action-button">
            Add New Patient
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
