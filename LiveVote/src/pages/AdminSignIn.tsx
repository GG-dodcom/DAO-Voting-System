/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { LoginForm } from '../components';

const AdminSignIn: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <LoginForm open={open} onClose={() => console.log()} />
    </div>
  );
};

export default AdminSignIn;
