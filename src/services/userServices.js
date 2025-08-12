import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_BASE_URL;
//const TOKEN = process.env.REACT_APP_API_TOKEN;

//Login API
export const getLoginInfoByMobile = async (mobile) => {
  try {
    const response = await axios.get(`http://itpvuatcapi.press2india.com:8084/api/iTPVCentralAPI/GetLoginInfoByMobile`, {
      params: { mobile },
      headers: {
        Token: "7Jx7ou6DwTvK79ig3ZiZbW7SCXoJ5B7kB1IAjg8AL14=",
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
    const response = await axios.post(`http://itpvuatcapi.press2india.com:8084/api/iTPVCentralAPI/RegisterUser`, userData, {
      headers: {
        'Token': "7Jx7ou6DwTvK79ig3ZiZbW7SCXoJ5B7kB1IAjg8AL14=",
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
    const response = await axios.get(`http://itpvuatcapi.press2india.com:8084/api/iTPVCentralAPI/GetCustomerDetailsById`, {
      params: { CustomerUniqueId },
      headers: {
        token: "7Jx7ou6DwTvK79ig3ZiZbW7SCXoJ5B7kB1IAjg8AL14=",
      },
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
