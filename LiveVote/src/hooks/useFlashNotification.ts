/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

// Define the Notification interface
interface Notification {
  id: number;
  message: string;
  type: string;
  remove: () => void;
}

export function useFlashNotification() {
  const [items, setItems] = useState<Notification[]>([]);

  const notify = useCallback((payload: any, duration = 4000) => {
    const item: Notification = {
      id: Math.floor(Date.now() * Math.random()),
      message: Array.isArray(payload) ? payload[1] : payload,
      type: Array.isArray(payload) ? payload[0] : 'green',
      remove: function () {
        setItems((prevItems) => prevItems.filter((i) => i.id !== this.id));
      },
    };

    setItems((prevItems) => [...prevItems, item]);

    setTimeout(() => item.remove(), duration);
  }, []);

  return { notify, items };
}
