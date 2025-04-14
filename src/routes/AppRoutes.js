import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Stats from '../pages/Stats'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
};

export default AppRoutes;
