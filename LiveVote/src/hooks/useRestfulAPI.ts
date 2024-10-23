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

  async function postQuery(path: string, data: any): Promise<any> {
    try {
      setLoading(true);
      const response: any = await axios.post(path, data); // Send POST request with data

      // Check if the response status is in the range of success
      if (response.status >= 200 && response.status < 300) {
        return { data: response.data }; // Handle successful response
      } else {
        // Handle unexpected status
        return { error: `Unexpected status code: ${response.status}` };
      }
    } catch (error: any) {
      // Handle error and return error message
      let errorMessage: string;

      // Differentiate between errors
      if (axios.isAxiosError(error)) {
        // Axios error (network errors, etc.)
        errorMessage =
          error.response?.data.message ||
          error.message || // General error message
          'An error occurred while processing the request.';
      } else if (error instanceof Error) {
        // Other errors
        errorMessage = error.message;
      } else {
        // Fallback for unknown error types
        errorMessage = 'An unexpected error occurred.';
      }

      return { error: errorMessage };
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
