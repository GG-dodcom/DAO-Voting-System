/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode } from 'react';
import { config, projectId } from '../utils/web3';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { State, useAccount, WagmiProvider } from 'wagmi';
import { useAppKitAccount } from '@reown/appkit/react';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#f15b40',
    '--w3m-color-mix': '#f15b40',
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export const useWagmiAccount = () => {
  const { address } = useAppKitAccount();
  const { isConnected, chain } = useAccount();

  return {
    address,
    isConnected,
    chainId: chain?.id,
  };
};
