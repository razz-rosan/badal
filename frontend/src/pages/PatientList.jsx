import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, addPatient } from '../services/api';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patient_code: '',
    age: '',
    gender: ''
  });
  
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data.patients || []);
      setError('');
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPatients();
  }, []);
  
  const handleInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value
    });
  };
  
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      await addPatient(newPatient);
      setNewPatient({
        patient_code: '',
        age: '',
        gender: ''
      });
      setShowAddForm(false);
      fetchPatients();
    } catch (err) {
      setError('Failed to add patient');
    }
  };
  
  if (loading && patients.length === 0) {
    return <div className="loading">Loading patients...</div>;
  }
  
  return (
    <div className="patient-list-container">
      <h1>Patients</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="add-button" 
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : 'Add New Patient'}
      </button>
      
      {showAddForm && (
        <form className="add-patient-form" onSubmit={handleAddPatient}>
          <div className="form-group">
            <label>Patient Code</label>
            <input 
              type="text" 
              name="patient_code"
              value={newPatient.patient_code} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Age</label>
            <input 
              type="number" 
              name="age"
              value={newPatient.age} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={newPatient.gender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button type="submit" className="submit-button">Add Patient</button>
        </form>
      )}
      
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="patient-grid">
          {patients.map(patient => (
            <div key={patient.id} className="patient-card">
              <h3>{patient.patient_code}</h3>
              <p>Age: {patient.age || 'N/A'}</p>
              <p>Gender: {patient.gender || 'N/A'}</p>
              <Link to={`/patients/${patient.id}`} className="view-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
