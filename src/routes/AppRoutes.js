import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RedirectAll from "./RedirectAll";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 나머지는 외부로 리다이렉트 */}
      <Route path="*" element={<RedirectAll />} />
    </Routes>
  );
}
