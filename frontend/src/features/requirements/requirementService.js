import axios from "axios";

const DEV_API = "http://localhost:8000";
const PROD_API = "https://orbital-backend-axsauce.vercel.app";

const API_URL = PROD_API + "/api/requirements/";

// Create new module
const getRequirements = async (major) => {

  const response = await axios.get(API_URL, major);

  return response.data;
};

export {
    getRequirements,
  }