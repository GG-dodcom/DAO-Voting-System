import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WagmiHooks } from './components/WagmiHooks';
import { useApp } from './hooks/useApp';
import './utils/i18n';
import { LoadingSpinner, TheFooter, TheNavbar } from './components';
import AppRoutes from './routes';
import { FlashNotificationProvider } from './context/useFlashNotification';
import Web3ModalProvider from './context/web3';
import { cookieToInitialState } from 'wagmi';
import { config } from './utils/web3';

const App: React.FC = () => {
  const route = useLocation();
  const { domain, init, isReady } = useApp();

  useEffect(() => {
    const initialize = async () => {
      await init();
    };

    initialize();
  }, []); // Empty dependency array means this runs once after the initial render

  const cookie = document.cookie;
  const initialState = cookieToInitialState(config, cookie);

  return (
    <Web3ModalProvider initialState={initialState}>
      <FlashNotificationProvider>
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
              {/* <p>domain: {domain}</p>
          <WagmiHooks /> */}

              <div id="content" className="pb-6 pt-4">
                <AppRoutes />
              </div>

              {(route.pathname === '/' ||
                route.pathname === '/about' ||
                route.pathname === '/userManual') && (
                <footer className="mt-auto">
                  <TheFooter />
                </footer>
              )}
              <div id="action-bar" />
            </div>
          )}
        </div>
      </FlashNotificationProvider>
    </Web3ModalProvider>
  );
};

export default App;

// import React from 'react';
// import QrCodeScanner from './components/QrCodeScanner';
// import QRCodeGenerator from './components/QRCodeGenerator';

// const App = () => {
//   return (
//     <div>
//       <QrCodeScanner />

//       <div>
//         <QRCodeGenerator />
//       </div>
//     </div>
//   );
// };

// export default App;
