import axios from 'axios';
import dataservice, { base_url } from '../utils/api_config';
import { apiRoutes } from '../utils/apiRoutes';

export const GET_ALL_USERS_URI_API = async (sendData) => {
  try {
    const response = await dataservice.get(
      `${apiRoutes.USERS_URI}?page=${sendData}&limit=20`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    return { status: 'error', data: error.response?.data?.message };
  }
};

export const SEARCH_USERS_URI_API = async (sendData) => {
  try {
    // `${apiRoutes.SEARCH_USERS_UPI}`
    const response = await dataservice.get(
      `${apiRoutes.USERS_URI}?search=${sendData}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    return { status: 'error', data: error.response?.data?.message };
  }
};
