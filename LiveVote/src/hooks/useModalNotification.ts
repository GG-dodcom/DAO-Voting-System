/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';

// Define the Notification interface
interface Notification {
  id: number;
  description: string;
  type: 'info' | 'warning' | 'warning-red';
  remove: () => any;
}

// Custom hook for modal notifications
export function useModalNotification() {
  const [items, setItems] = useState<Notification[]>([]);

  const notifyModal = useCallback(
    (type: 'info' | 'warning' | 'warning-red', description: string) => {
      const item: Notification = {
        id: Math.floor(Date.now() * Math.random()),
        description,
        type,
        remove: () => {
          setItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Use the captured id here
        },
      };

      // Set the updated state using the latest value of items
      setItems((prevItems) => {
        return [...prevItems, item];
      });
    },
    []
  );

  return { notifyModal, items, Notification };
}
