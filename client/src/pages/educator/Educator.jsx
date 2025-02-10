import React from 'react';
import { Outlet } from 'react-router-dom';

const Educator = () => {
  return (
    <div>
      <h1>Educator Dashboard</h1>
      <Outlet />  {/* ✅ This renders nested routes inside /educator */}
    </div>
  );
};

export default Educator;
