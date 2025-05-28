import axios from 'axios';
import dataservice, { base_url } from '../utils/api_config';
import { apiRoutes } from '../utils/apiRoutes';

export const LOGIN_URI_API = async (sendData) => {
  try {
    const response = await axios.post(
      `${base_url}${apiRoutes.LOGIN_URI}`,
      sendData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
  
    return response.data

  } catch (error) {
    return { status: 'error', data: error.response?.data?.message };
  }
};
