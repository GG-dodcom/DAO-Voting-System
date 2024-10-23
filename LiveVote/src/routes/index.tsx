import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const About = lazy(() => import('../pages/About.tsx'));
const UserManual = lazy(() => import('../pages/UserManual'));
const AdminSignIn = lazy(() => import('../pages/AdminSignIn.tsx'));
const SpaceProposals = lazy(() => import('../pages/SpaceProposals.tsx'));
const SpaceCreate = lazy(() => import('../pages/SpaceCreate.tsx'));
const SpaceProposal = lazy(() => import('../pages/SpaceProposal.tsx'));
const NotFoundPage = () => <Navigate to="/" />;

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SpaceProposals />} />
        <Route path="/spaceProposals" element={<SpaceProposals />} />

        <Route path="/about" element={<About />} />
        <Route path="/proposal/:id" element={<SpaceProposal />} />
        <Route path="/userManual" element={<UserManual />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route path="/create" element={<SpaceCreate />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
