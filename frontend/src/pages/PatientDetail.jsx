import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { uploadGeneticData, uploadSkinImage } from '../services/api';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [geneticFile, setGeneticFile] = useState(null);
  const [skinFile, setSkinFile] = useState(null);
  const [geneticResult, setGeneticResult] = useState(null);
  const [skinResult, setSkinResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch patient details
  useEffect(() => {
    // This would normally fetch patient details from API
    // For simplicity, we're just setting loading to false
    setLoading(false);
  }, [id]);
  
  const handleGeneticUpload = async (e) => {
    e.preventDefault();
    if (!geneticFile) return;
    
    try {
      setLoading(true);
      const result = await uploadGeneticData(id, geneticFile);
      setGeneticResult(result);
      setGeneticFile(null);
      setError('');
    } catch (err) {
      setError('Failed to upload genetic data');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSkinUpload = async (e) => {
    e.preventDefault();
    if (!skinFile) return;
    
    try {
      setLoading(true);
      const result = await uploadSkinImage(id, skinFile);
      setSkinResult(result);
      setSkinFile(null);
      setError('');
    } catch (err) {
      setError('Failed to upload skin image');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !patient) {
    return <div className="loading">Loading patient data...</div>;
  }
  
  return (
    <div className="patient-detail-container">
      <h1>Patient Details</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="upload-section">
        <div className="upload-card">
          <h2>Genetic Data Analysis</h2>
          <form onSubmit={handleGeneticUpload}>
            <div className="form-group">
              <label>Upload Genetic Data</label>
              <input 
                type="file" 
                onChange={(e) => setGeneticFile(e.target.files[0])} 
              />
            </div>
            <button 
              type="submit" 
              className="upload-button"
              disabled={!geneticFile || loading}
            >
              {loading ? 'Processing...' : 'Upload & Analyze'}
            </button>
          </form>
          
          {geneticResult && (
            <div className="result-card">
              <h3>Analysis Result</h3>
              <p>
                Cancer Detected: 
                <span className={geneticResult.prediction ? 'positive' : 'negative'}>
                  {geneticResult.prediction ? 'Yes' : 'No'}
                </span>
              </p>
              <p>Confidence: {(geneticResult.confidence * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
        
        <div className="upload-card">
          <h2>Skin Cancer Detection</h2>
          <form onSubmit={handleSkinUpload}>
            <div className="form-group">
              <label>Upload Skin Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setSkinFile(e.target.files[0])} 
              />
            </div>
            <button 
              type="submit" 
              className="upload-button"
              disabled={!skinFile || loading}
            >
              {loading ? 'Processing...' : 'Upload & Analyze'}
            </button>
          </form>
          
          {skinResult && (
            <div className="result-card">
              <h3>Analysis Result</h3>
              <p>Cancer Type: {skinResult.cancer_type}</p>
              <p>Confidence: {(skinResult.confidence * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
