import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;
const TOKEN = process.env.REACT_APP_API_TOKEN;

//Login API
export const getLoginInfoByMobile = async (mobile) => {
  try {
    const response = await axios.get(`/api/iTPVCentralAPI/GetLoginInfoByMobile`, {
      params: { mobile },
      headers: {
        Token: TOKEN,
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`/api/iTPVCentralAPI/RegisterUser`, userData, {
      headers: {
        'Token': TOKEN,
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get customer details by ID
export const getCustomerDetailsById = async (CustomerUniqueId) => {
  try {
    const response = await axios.get(`/api/iTPVCentralAPI/GetCustomerDetailsById`, {
      params: { CustomerUniqueId },
      headers: {
        token: TOKEN,
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
