import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const App = lazy(() => import('../App.tsx'));
const About = lazy(() => import('../pages/About.tsx'));
const ExploreView = lazy(() => import('../pages/ExploreView'));
const UserManual = lazy(() => import('../pages/UserManual'));
const AdminHome = lazy(() => import('../pages/AdminHome.tsx'));
const AdminSignIn = lazy(() => import('../pages/AdminSignIn.tsx'));
const SpaceProposals = lazy(() => import('../pages/SpaceProposals.tsx'));
const SpaceCreate = lazy(() => import('../pages/SpaceCreate.tsx'));
const SpaceProposal = lazy(() => import('../pages/SpaceProposal.tsx'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/exploreView" element={<ExploreView />} />
        <Route path="/spaceProposals" element={<SpaceProposals />} />
        <Route path="/proposal/:id" element={<SpaceProposal spaceKey={''} />} />
        <Route path="/userManual" element={<UserManual />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin_login" element={<AdminSignIn />} />
        <Route path="/spaceCreate" element={<SpaceCreate />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
