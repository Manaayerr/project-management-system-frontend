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
