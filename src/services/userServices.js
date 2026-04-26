import axios from 'axios';
import config from '../config/env';

const { apiBaseUrl, apiToken } = config;

// Login API
export const getLoginInfoByMobile = async (mobile) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/GetLoginInfoByMobile`, {
      params: { mobile },
      headers: {
        Token: apiToken,
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/RegisterUser`, userData, {
      headers: {
        Token: apiToken,
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
    const response = await axios.get(`${apiBaseUrl}/GetCustomerDetailsById`, {
      params: { CustomerUniqueId },
      headers: {
        Token: apiToken,
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
