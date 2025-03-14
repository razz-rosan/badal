import React, { useState, useEffect } from 'react';
import { getResearchData } from '../services/api';

const ResearcherDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResearchData();
        setData(result);
        setError('');
      } catch (err) {
        setError('Failed to load research data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading research data...</div>;
  }
  
  return (
    <div className="researcher-dashboard">
      <h1>Researcher Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="data-section">
        <h2>Genetic Data Analysis</h2>
        {data && data.genetic_data.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Cancer Detected</th>
                <th>Confidence</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.genetic_data.map((item, index) => (
                <tr key={index}>
                  <td>{item.prediction ? 'Yes' : 'No'}</td>
                  <td>{(item.confidence * 100).toFixed(2)}%</td>
                  <td>{item.age || 'N/A'}</td>
                  <td>{item.gender || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No genetic data available.</p>
        )}
      </div>
      
      <div className="data-section">
        <h2>Skin Cancer Data</h2>
        {data && data.skin_data.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Cancer Type</th>
                <th>Confidence</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.skin_data.map((item, index) => (
                <tr key={index}>
                  <td>{item.cancer_type}</td>
                  <td>{(item.confidence * 100).toFixed(2)}%</td>
                  <td>{item.age || 'N/A'}</td>
                  <td>{item.gender || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No skin cancer data available.</p>
        )}
      </div>
    </div>
  );
};

export default ResearcherDashboard;
