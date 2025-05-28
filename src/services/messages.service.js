import axios from 'axios';
import dataservice, { base_url } from '../utils/api_config';
import { apiRoutes } from '../utils/apiRoutes';

// ==================== Get Selected User Messages =======================

export const GET_SELECTED_USERS_MASSAGES_API = async (data, token) => {
  try {
    const response = await dataservice.post(
      `${apiRoutes.MASSAGES_BY_USERS_ID_URI}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return { status: 'error', data: errorMessage };
  }
};
