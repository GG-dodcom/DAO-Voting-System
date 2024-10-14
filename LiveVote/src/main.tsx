import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './routes'; // Import your route configuration
import './assets/css/main.scss';
import './utils/i18n';
import Web3ModalProvider from './context/web3';
import { cookieToInitialState } from 'wagmi';
import { config } from './utils/web3';

const cookie = document.cookie;
const initialState = cookieToInitialState(config, cookie);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Web3ModalProvider initialState={initialState}>
        <AppRoutes />
      </Web3ModalProvider>
    </BrowserRouter>
  </StrictMode>
);
