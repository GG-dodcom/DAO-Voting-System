/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';

const AdminSignIn: React.FC = () => {
  const navigate = useNavigate();
  const open = true;

  const handleLoginSuccess = (isAdmin: boolean) => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div>
      <LoginForm
        open={open}
        onClose={handleClose}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default AdminSignIn;
