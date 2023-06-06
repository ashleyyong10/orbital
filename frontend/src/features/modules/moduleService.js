import axios from "axios";

const DEV_API = "http://localhost:8000"
const PROD_API = "https://orbital-backend-axsauce.vercel.app"

const API_URL = DEV_API + "/api/modules/"

// Create new module
const createModule = async (moduleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, moduleData, config);

  return response.data;
};

// Get user modules
const getModules = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user module
const deleteModule = async (moduleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + moduleId, config);

  return response.data;
};

const moduleService = {
  createModule,
  getModules,
  deleteModule,
};

export default moduleService;
