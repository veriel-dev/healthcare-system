import { Data, IUserResponse } from '@/types';
import { handleRequest } from './basic';
import { config } from '@/config';
import axios from 'axios';

export const userService = {
  getAll: (token?: string) =>
    handleRequest<IUserResponse<Data[]>>(
      {
        method: 'GET',
        url: config.auth.backend.usersUrlBackend,
      },
      token,
    ),

  getById: (id: string, token?: string) =>
    handleRequest<IUserResponse<Data>>(
      {
        method: 'GET',
        url: `${config.auth.backend.usersUrlBackend}/${id}`,
      },
      token,
    ),
};

export const getUserById = async (token: string, id: string) => {
  if (!token) throw new Error('No token provided');

  try {
    const response = await axios.get(config.auth.backend.usersUrlBackend + `/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};
