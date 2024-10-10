// import React, { Suspense, lazy, useEffect, useState } from 'react';
// import { Routes, Route, TheFooter, BaseNoResults } from './components/index';
// import { useLocation } from 'react-router-dom'; // To mimic Vue Router
// import LoadingSpinner from './components/LoadingSpinner'; // Create this component
// import TheNavbar from './components/TheNavbar'; // Create this component
// import ExploreSkeletonLoading from './pages/ExploreSkeletonLoading';
// // import { useApp } from './hooks/useApp'; // Replace with your actual hook
// import './utils/i18n';
// import ExploreSpaces from './components/ExploreSpace';

// const dummyValues = {
//   init: () => console.log('Initialized!'),
//   isReady: true, // or false based on your scenario
// };

// const ExploreView = lazy(() => import('./pages/ExploreView'));
// const RankingView = lazy(() => import('./pages/About'));

// const App: React.FC = () => {
//   // const { init, isReady } = useApp();
//   const { init, isReady } = dummyValues;
//   const route = useLocation();

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
//           {/* <div id="content" className="pb-6 pt-4">
//             <Suspense fallback={<div>Loading...</div>}>
//               <Routes location={location}>
//                 <Route path="/exploreView" element={<ExploreView />} />
//                 <Route path="/about" element={<RankingView />} />
//               </Routes>
//             </Suspense>
//           </div> */}
//           <ExploreSpaces />

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

import React, { useState } from 'react';
import { LoginForm } from './components'; // Adjust the path according to your folder structure
import { TuneButton } from './components'; // Assuming TuneButton is in the same directory

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState({ username: '', password: '' }); // This can be set to existing admin account info if needed

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Welcome to the Admin Portal</h1>
      <TuneButton onClick={handleOpen}>Login</TuneButton>

      <LoginForm account={account} open={open} onClose={handleClose} />

      {/* This is an optional notification area if you want to display notifications somewhere */}
      {/* <NotificationArea items={notify.items} /> */}
    </div>
  );
};

export default App;
