import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/_globals.scss";

// GitHub Pages 404 fallback 대응
const redirectPath = new URLSearchParams(window.location.search).get(
  "redirect"
);
if (redirectPath && redirectPath.startsWith("/")) {
  window.history.replaceState(null, "", redirectPath);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-firebase-menu-picker">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
