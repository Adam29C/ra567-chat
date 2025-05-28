import axios from 'axios';
import dataservice, { base_url } from '../utils/api_config';
import { apiRoutes } from '../utils/apiRoutes';

export const FOR_GET_LIST = async (URL, sendData) => {
  try {
    const response = await dataservice.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return { status: 'error', data: error.response?.data?.message };
  }
};

export const FOR_POST_REQUEST = async (URL, sendData) => {
  try {
    const response = await dataservice.post(`${URL}`, sendData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const FOR_DELETE_REQUEST = async (URL, sendData) => {
  try {
    const response = await dataservice.delete(`${URL}/${sendData}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const FOR_UPDATE_REQUEST = async (URL, sendData) => {
  try {
    const response = await dataservice.patch(`${URL}`, sendData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const GET_UPLOAD_DOCUMENT_LINK = async (URL, sendData) => {
  try {
    const response = await dataservice.post(`${URL}`, sendData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};
