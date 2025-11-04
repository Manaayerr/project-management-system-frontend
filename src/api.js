import axiosInstance from "./api/axiosInstance";
// const API_BASE = "http://127.0.0.1:8000/api";

export const createProject = async (projectData =>{
  try{
    const response = await axiosInstance.post(`/projects`,projectData)
    return response.data
  }catch(error){
    console.error('Error creating project:' error.response?.data || error.message)
    throw error
  }
})

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
        const response = await axiosInstance.get(`projects/${projectId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project ${projectId} details:`, error);
        throw error;
    }
  };


export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`/profiles/`);
        
        return response.data.map(profile => ({
            id: profile.user.id,        
            username: profile.user.username, 
        }));
        
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return []; 
    }
};

  export const getProjectsTasks = async (projectId) => {
  try {
        const response = await axiosInstance.get(`/projects/${projectId}/tasks/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching project tasks:", error.response?.data || error.message);
        throw error;
    }
}

export const createTask = async (projectId,taskData) => {
  try{
    const dataToSend = {...taskData, project_id: projectId}
    const response = await axiosInstance.post (`/projects/${projectId}/tasks/`, dataToSend)
    return response.data
  }catch(error){
    console.error('Error creating task: ', error.response?.data || error.message)
    throw error
  }
}

export const updateTask = async (projectId,taskId,taskData) =>{
  try{
    const response = await axiosInstance.put (`/projects/${projectId}/tasks/${taskId}/`, taskData)
    return response.data
  }catch(error){
    console.error('Error uodating task: ', error.response?.data || error.message)
    throw error
  }
}

export const deleteTask = async (projectId,taskId) => {
  try{
    await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}/`)
  }catch(error){
    console.error('Error deleting task: ', error.response?.data || error.message)
    throw error
  }
}

