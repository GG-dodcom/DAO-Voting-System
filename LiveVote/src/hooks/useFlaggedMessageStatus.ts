import { useState, useCallback, useMemo } from 'react';
import { create } from 'zustand';

interface FlaggedMessageState {
  flaggedMessageStateMap: Record<string, boolean>;
  setVisibility: (id: string, state: boolean) => void;
  isFlaggedMessageVisible: (id: string) => boolean;
}

const useFlaggedMessageStore = create<FlaggedMessageState>((set, get) => ({
  flaggedMessageStateMap: {},
  setVisibility: (id, state) => {
    const { flaggedMessageStateMap } = get();
    const isNotVisible = flaggedMessageStateMap[id] === false;

    if (isNotVisible) return;

    set((prevState) => ({
      flaggedMessageStateMap: {
        ...prevState.flaggedMessageStateMap,
        [id]: state,
      },
    }));
  },
  isFlaggedMessageVisible: (id) => {
    const { flaggedMessageStateMap } = get();
    return flaggedMessageStateMap[id] || false;
  },
}));

export function useFlaggedMessageStatus(pageId: string | { current: string }) {
  const { setVisibility, isFlaggedMessageVisible } = useFlaggedMessageStore();
  const [id] = useState(() =>
    typeof pageId === 'string' ? pageId : pageId.current
  );

  const isMessageVisible = useMemo(
    () => isFlaggedMessageVisible(id),
    [id, isFlaggedMessageVisible]
  );

  const setMessageVisibility = useCallback(
    (state: boolean) => setVisibility(id, state),
    [id, setVisibility]
  );

  return {
    isMessageVisible,
    setMessageVisibility,
  };
}
