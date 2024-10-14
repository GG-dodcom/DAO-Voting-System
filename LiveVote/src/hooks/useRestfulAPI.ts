/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';

export function useRestfulAPI() {
  const [loading, setLoading] = useState(false); // Use state to track loading

  async function fetchQuery(path: string, params?: any): Promise<any[]> {
    try {
      setLoading(true);
      const response = await axios.get(path, { params });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data: ' + error);
    } finally {
      setLoading(false);
    }
  }

  async function postQuery(
    path: string,
    data: any
  ): Promise<{ success: boolean; result: any }> {
    try {
      setLoading(true);
      const response: any = await axios.post(path, data); // Send POST request with data

      if (response.status === 200) {
        return { success: true, result: response.data }; // Return success message
      }
      return { success: false, result: response.data }; // Handle unexpected status
    } catch (error: any) {
      // Handle error and return error message
      const errorMessage =
        error.response?.data.message ||
        `An error occurred while saving data. ${error}`;
      return { success: false, result: errorMessage };
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
