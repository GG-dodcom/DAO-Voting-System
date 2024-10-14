// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { WagmiHooks } from './components/WagmiHooks';
// import ExploreView from './pages/ExploreView';
// import { useApp } from './hooks/useApp';
// import './utils/i18n';
// import {
//   LoadingSpinner,
//   ProposalsItemFooter,
//   TheFooter,
//   TheNavbar,
// } from './components';
// import { Proposal } from './utils/interfaces';

// const exampleProposal: Proposal = {
//   state: 'closed', // or 'pending', 'closed', 'active'
//   start: 1728640391, // Timestamp for start
//   end: 1728650391, // Timestamp for end
//   scores_total: 500,
//   scores: [300, 200],
// };

// const App: React.FC = () => {
//   const route = useLocation();

//   const { domain, init, isReady } = useApp();

//   useEffect(() => {
//     const initialize = async () => {
//       await init();
//     };

//     initialize();
//   }, []); // Empty dependency array means this runs once after the initial render

//   return (
//     <div className="flex min-h-screen">
//       {!isReady ? (
//         <div className="overlay big animate-fade-in">
//           <LoadingSpinner />
//         </div>
//       ) : (
//         <div className="relative flex w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow">
//           <div
//             id="navbar"
//             className="sticky top-0 z-40 border-b border-skin-border bg-skin-bg"
//           >
//             <TheNavbar />
//           </div>
//           <ProposalsItemFooter proposal={exampleProposal} />
//           <p>domain: {domain}</p>
//           <WagmiHooks />

//           <ExploreView />

//           {route.pathname === '/' && (
//             <footer className="mt-auto">
//               <TheFooter />
//             </footer>
//           )}
//           <div id="action-bar" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpaceCreate from './pages/SpaceCreate'; // Adjust the path according to your project structure
import { ExtendedSpace } from './utils/interfaces'; // Import ExtendedSpace interface
import { TheNavbar } from './components';

const App: React.FC = () => {
  // Sample space object to pass as a prop
  const space: ExtendedSpace = {
    id: '1',
    name: 'Art DAO',
    symbol: 'ART',
    about: 'A DAO focused on curating and promoting digital art',
    turbo: false,
    voting: {
      delay: 0,
      period: 0,
      type: 'single-choice',
    },
  };

  return (
    <>
      <TheNavbar />
      <SpaceCreate />
    </>
  );
};

export default App;
