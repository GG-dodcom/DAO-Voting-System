import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WagmiHooks } from './components/WagmiHooks';
import { useApp } from './hooks/useApp';
import './utils/i18n';
import { LoadingSpinner, TheFooter, TheNavbar } from './components';
import SpaceProposals from './pages/SpaceProposals';

const App: React.FC = () => {
  const route = useLocation();

  const { domain, init, isReady } = useApp();

  useEffect(() => {
    const initialize = async () => {
      await init();
    };

    initialize();
  }, []); // Empty dependency array means this runs once after the initial render

  return (
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
          <p>domain: {domain}</p>
          <WagmiHooks />

          <SpaceProposals />

          {route.pathname === '/' && (
            <footer className="mt-auto">
              <TheFooter />
            </footer>
          )}
          <div id="action-bar" />
        </div>
      )}
    </div>
  );
};

export default App;
