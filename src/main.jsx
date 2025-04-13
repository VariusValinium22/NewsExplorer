import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./contexts/ModalContext";

import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
