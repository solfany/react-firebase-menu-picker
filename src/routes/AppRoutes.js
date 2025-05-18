import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Result from "../pages/Result";
import UpdateVersionDoc from "../pages/UpdateVersionDoc";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/update-version-doc" element={<UpdateVersionDoc />} />
    </Routes>
  );
};

export default AppRoutes;
