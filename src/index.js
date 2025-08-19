import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const BASENAME = "/react-firebase-menu-picker"; // GitHub Pages 서브경로

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={BASENAME}>
    <App />
  </BrowserRouter>
);
