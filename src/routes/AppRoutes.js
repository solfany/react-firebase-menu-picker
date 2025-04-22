import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Stats from '../pages/Stats'
import DiningOut from '../pages/admin/DiningOut';
import DiningAdmin from '../pages/admin/DiningAdmin';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/dining-out" element={<DiningOut />} />
      <Route path="/dining-admin" element={<DiningAdmin />} />

    </Routes>
  );
};

export default AppRoutes;
