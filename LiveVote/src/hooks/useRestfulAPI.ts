/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import { useFlashNotification } from '../context';

export function useRestfulAPI() {
  const [loading, setLoading] = useState(false); // Use state to track loading
  const { notify } = useFlashNotification();

  async function fetchQuery(path: string, params?: any): Promise<any[]> {
    try {
      setLoading(true);
      const response = await axios.get(path, { params });
      return response.data;
    } catch (error) {
      let errorMessage: string;
      console.error(error);

      if (axios.isAxiosError(error)) {
        // Check if error response contains the specific path and status
        if (error.response?.data.path === '/api/proposals/view-all-proposals') {
          notify([
            'red',
            error.message ||
              'Results data could not be fetched. Proceeding without results',
          ]);
        } else if (
          error.response?.data.path === '/api/voting/getClosedRoomDetails'
        ) {
          notify(['red', error.message || 'Check connection with harthat']);
        } else if (
          error.response?.data.path === '/api/proposals/get-user-voted-proposal'
        ) {
          return [];
        } else if (
          error.response?.data.path === '/api/proposals/get-voting-result'
        ) {
          return [];
        } else if (
          error.response?.data.path === '/api/proposals/validate-qr-status'
        ) {
          if (error.response?.status === 404) notify(['red', error.message]);
        } else {
          // General error handling
          errorMessage =
            error.response?.data.message ||
            error.message ||
            'An error occurred while processing the request.';
          notify(['red', errorMessage]);
        }
      }

      throw new Error('Error fetching data: ' + error);
    } finally {
      setLoading(false);
    }
  }

  async function postQuery(
    path: string,
    data?: any,
    params?: any
  ): Promise<any> {
    try {
      setLoading(true);
      const response: any = await axios.post(path, data, { params });

      console.info('response', response);

      return response;
    } catch (error: any) {
      let errorMessage: string;
      console.error(error);

      if (axios.isAxiosError(error)) {
        // Check if error response contains the specific path and status
        if (error.response?.data.path === '/api/auth/login') {
          if (error.response?.status === 500)
            notify(['red', 'Invalid login username or password']);
          if (error.response?.status === 400) notify(['red', error.message]);
        } else {
          // General error handling
          errorMessage =
            error.response?.data.message ||
            error.message ||
            'An error occurred while processing the request.';
          notify(['red', errorMessage]);
        }
      }

      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    fetchQuery,
    postQuery,
    queryLoading: loading,
  };
}
