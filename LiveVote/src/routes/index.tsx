import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const App = lazy(() => import('../App.tsx'));
const About = lazy(() => import('../pages/About.tsx'));
const ExploreView = lazy(() => import('../pages/ExploreView'));
const SpaceView = lazy(() => import('../pages/SpaceView'));
const UserManual = lazy(() => import('../pages/UserManual'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/exploreView" element={<ExploreView />} />
        <Route path="/spaceView" element={<SpaceView />} />
        <Route path="/userManual" element={<UserManual />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
