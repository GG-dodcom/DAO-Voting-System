import React from 'react';
import { cookieToInitialState } from 'wagmi';
import { config } from './utils/web3';
import Web3ModalProvider from './context/web3';

import './utils/i18n';
import { LoadingSpinner, TheFooter, TheNavbar } from './components';
import ExploreView from './pages/ExploreView';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const cookie = document.cookie;
  const initialState = cookieToInitialState(config, cookie);

  const dummyValues = {
    init: () => console.log('Initialized!'),
    isReady: true, // or false based on your scenario
  };

  // const { init, isReady } = useApp();
  const { init, isReady } = dummyValues;
  const route = useLocation();

  return (
    <Web3ModalProvider initialState={initialState}>
      <div className="flex min-h-screen">
        {!isReady ? (
          <div className="overlay big animate-fade-in">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="relative flex w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow">
            <div
              id="navbar"
              className="sticky top-0 z-40 border-b border-skin-border bg-skin-bg"
            >
              <TheNavbar />
            </div>
            <ExploreView />

            {route.pathname === '/' && (
              <footer className="mt-auto">
                <TheFooter />
              </footer>
            )}
            <div id="action-bar" />
          </div>
        )}
      </div>
    </Web3ModalProvider>
  );
};

export default App;
