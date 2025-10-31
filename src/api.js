import axiosInstance from "./api/axiosInstance";
// const API_BASE = "http://127.0.0.1:8000/api";

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get(`projects/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

  export const registerUser = async (userData) =>{
    try{
      const response = await axiosInstance.post(`register/`, userData)
      return response.data
    }catch (error){
      console.error('Registeration Error:', error.response.data)
      throw error
    }
  };

  export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post(`token/`, credentials); 
        
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Login Error:", error.response.data);
            throw error;
        } else if (error.request) {
            console.error("Network Error: Connection Refused or Timeout.");
            throw new Error("Cannot connect to the server. Please check the backend connection.");
        } else {
            console.error("General Error:", error.message);
            throw error;
        }
        
      } 
};
export const getProjectDetails = async (projectId) => {
    try {
        // نقطة النهاية في Django هي /api/projects/{id}/
        const response = await axiosInstance.get(`projects/${projectId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project ${projectId} details:`, error);
        throw error;
    }
  };