/* eslint-disable @typescript-eslint/no-explicit-any */
import { Performances } from '../utils/interfaces';
import API_PATHS from '../utils/queries';
import { useRestfulAPI } from '.';
import { useState } from 'react';

export function usePerformances() {
  const { fetchQuery } = useRestfulAPI();

  // Home Performance State
  const [loadingPerformancesHome, setLoadingPerformancesHome] = useState(false);
  const [loadingMorePerformancesHome, setLoadingMorePerformancesHome] =
    useState(false);
  const [performancesHome, setPerformancesHome] = useState<Performances[]>([]);
  const [performancesHomeTotal, setPerformancesHomeTotal] = useState(0);
  const [enablePerformancesHomeScroll, setEnablePerformancesHomeScroll] =
    useState(false);

  // General Performance Loading States
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(false);
  //TODO: add delete performance functiuon
  // const [isLoadingDeletedPerformance, setIsLoadingDeletedPerformance] =
  //   useState(false);
  const [performance, setPerformance] = useState<Performances[]>([]);

  function _fetchNewestPerformance(variables: any = {}, offset = 0) {
    return fetchQuery(API_PATHS.fetchNewestPerformance, {
      offset,
      orderBy: 'create',
      orderDirection: 'ASC',
      limit: variables.limit || 12,
      search: variables.searcch || undefined,
    });
  }

  async function loadPerformancesHome(variables?: any) {
    if (loadingPerformancesHome) return; // Prevent loading if already loading
    setLoadingPerformancesHome(true); // Set loading state to true
    try {
      const response: any = await _fetchNewestPerformance(variables);

      if (!response) return; // Return if no response

      setPerformancesHome(response.performances || []); // Set the fetched performance
      setPerformancesHomeTotal(response.total || 0); // Set the total number of performances
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPerformancesHome(false); // Reset loading state
    }
  }
  //TODO: json look like
  // items: [
  //   // array of performance data
  // ],
  // total: 100, // total number of performances in database

  // Function to fetch more spaces
  async function loadMorePerformancesHome(variables?: any) {
    if (
      loadingMorePerformancesHome ||
      performancesHomeTotal <= performancesHome.length
    ) {
      return; // Prevent fetching if already loading or no more spaces left
    }
    setLoadingMorePerformancesHome(true); // Set loading state to true
    try {
      const response: any = await _fetchNewestPerformance(
        variables,
        performancesHome.length
      );

      if (!response) return;

      // Append new items to the existing performance array
      setPerformancesHome((prevPerformances) => [
        ...prevPerformances,
        ...response.performances,
      ]);

      // Update total
      setPerformancesHomeTotal(response.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMorePerformancesHome(false); // Reset loading state
    }
  }

  async function loadPerformances(id_in: string[]) {
    if (isLoadingPerformance || !id_in.length) return;

    setIsLoadingPerformance(true); // Set loading state to true
    try {
      const response: any = await fetchQuery(API_PATHS.fetchPerformance, {
        id_in,
        offset: 0,
        limit: 1000,
      });

      if (!response) return;

      // Update the state with the fetched spaces
      setPerformance(response.performances || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingPerformance(false); // Reset loading state
    }
  }

  //TODO: implement delete performance function
  // async function getDeletedSpaces(ids: string[]) {
  //   isLoadingDeletedSpaces.value = true;
  //   const results = await Promise.allSettled(
  //     ids.map(async (id) => {
  //       try {
  //         const response = await fetch(
  //           `${import.meta.env.VITE_HUB_URL}/api/spaces/${id}`,
  //           {
  //             headers: { 'Content-Type': 'application/json' },
  //           }
  //         );

  //         return (await response.json())?.deleted === true ? id : null;
  //       } catch (e) {
  //         console.error(e);
  //         return null;
  //       }
  //     })
  //   );
  //   isLoadingDeletedSpaces.value = false;

  //   return results.map((r) => r.value).filter((a) => a);
  // }

  return {
    loadPerformances,
    loadPerformancesHome,
    loadMorePerformancesHome,
    loadingPerformancesHome,
    loadingMorePerformancesHome,
    performancesHome,
    performancesHomeTotal,
    enablePerformancesHomeScroll,
    setEnablePerformancesHomeScroll,
    isLoadingPerformance,
    performance,
  };
}
