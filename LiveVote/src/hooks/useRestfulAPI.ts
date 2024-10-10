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
    formData: any
  ): Promise<{ success: boolean; result: any }> {
    try {
      setLoading(true);
      const response: any = await axios.post(path, {
        method: 'POST',
        body: formData,
      }); // Send POST request with data

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (response.result.statusCode === 200) {
        return { success: true, result: result }; // Return success message
      }
      return { success: false, result: result }; // Handle unexpected status
    } catch (error: any) {
      // Handle error and return error message
      const errorMessage =
        error.response?.message ||
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

//usage
// import React, { useEffect } from 'react';
// import { useQuery } from './useQuery'; // Adjust path as necessary

// const MyComponent = () => {
//   const { fetchQuery, queryLoading } = useQuery();

//   const handleFetchData = async () => {
//     try {
//       const data = await fetchQuery('/api/some-endpoint'); // Provide the correct path
//       console.log('Fetched Data:', data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   return (
//     <div>
//       {queryLoading ? <p>Loading...</p> : <p>Data loaded</p>}
//       <button onClick={handleFetchData} disabled={queryLoading}>
//         Fetch Data
//       </button>
//     </div>
//   );
// };

// export default MyComponent;
