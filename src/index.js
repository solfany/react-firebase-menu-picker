// src/index.js
// ReactDOM.render() 메서드를 사용하여 React 애플리케이션을 DOM에 렌더링하는 코드입니다.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/react-firebase-menu-picker">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);