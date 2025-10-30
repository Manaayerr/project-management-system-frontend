import axios from 'axios';

const API_BASE = "http://127.0.0.1:8000/api";

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE}/projects/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

  export const registerUser = async (userData) =>{
    try{
      const response = await axios.post(`$API_BASE/register/`, userData)
      return response.data
    }catch (error){
      console.error('Registeration Error:', error.response.data)
      throw error
    }
  };

  export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE}/token/`, credentials); 
        
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response.data);
        throw error; 
    }
};