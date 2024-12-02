/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { LoginForm } from '../components';

const AdminSignIn: React.FC = () => {
  const open = true;

  const handleLoginSuccess = (isAdmin: boolean) => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  };

  return (
    <div>
      <LoginForm
        open={open}
        onClose={() => console.log()}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AdminSignIn;
