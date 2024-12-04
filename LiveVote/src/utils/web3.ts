//src/utils/web3.ts

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { hardhat } from 'wagmi/chains';

// Get projectId at https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'LiveVote',
  description: 'LiveVote',
  url: 'https://localhost:5173',
  icons: ['https://ibb.co/D54bZF8'],
};

// Create wagmiConfig
const chains = [hardhat] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
