/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { TheFlashNotification } from '../components';

interface Notification {
  id: number;
  message: string;
  type: string;
  remove: () => any;
}

// Create the context
const FlashNotificationContext = createContext<{
  notify: (payload: any, duration?: number) => void;
  items: Notification[];
} | null>(null);

// Custom hook for using the FlashNotification context
export const useFlashNotification = () => {
  const context = useContext(FlashNotificationContext);
  if (!context) {
    throw new Error(
      'useFlashNotification must be used within a FlashNotificationProvider'
    );
  }
  return context;
};

export const FlashNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<Notification[]>([]);

  const notify = useCallback((payload: any, duration = 4000) => {
    const item: Notification = {
      id: Math.floor(Date.now() * Math.random()),
      message: Array.isArray(payload) ? payload[1] : payload,
      type: Array.isArray(payload) ? payload[0] : 'green',
      remove: function () {
        setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      },
    };
    console.log('new items:', item);
    setItems((prevItems) => [...prevItems, item]);

    setTimeout(() => item.remove(), duration);
  }, []);

  return (
    <FlashNotificationContext.Provider value={{ notify, items }}>
      {children}
      <TheFlashNotification />
    </FlashNotificationContext.Provider>
  );
};
