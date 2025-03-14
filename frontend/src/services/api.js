import axios from 'axios';

const API_URL = 'http://0.0.0.0:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get('/hospital/patients');
  return response.data;
};

export const addPatient = async (patientData) => {
  const response = await api.post('/hospital/patients', patientData);
  return response.data;
};

export const uploadGeneticData = async (patientId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(
    `/hospital/patients/${patientId}/genetic`, 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

export const uploadSkinImage = async (patientId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(
    `/hospital/patients/${patientId}/skin`, 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

export const getResearchData = async () => {
  const response = await api.get('/researcher/data');
  return response.data;
};
