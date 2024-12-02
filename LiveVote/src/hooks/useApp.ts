/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAppKitAccount, useAppKit, createAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { mainnet, polygon, bsc, hardhat } from 'viem/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { projectId } from '../utils/web3';

const domain = window.location.hostname;

// 2. Setup wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [hardhat],
});

// 3. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [hardhat],
  metadata: {
    name: 'AppKit',
    description: 'AppKit React Wagmi Example',
    url: '',
    icons: [],
  },
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#f15b40',
    '--w3m-color-mix': '#f15b40',
  },
});

export function useApp() {
  const [isReady, setIsReady] = useState(false);

  const { address, caipAddress, isConnected, status } = useAppKitAccount();

  const modal = useAppKit();

  async function init() {
    setIsReady(true);
  }

  return {
    domain,
    isReady,
    init,
  };
}
