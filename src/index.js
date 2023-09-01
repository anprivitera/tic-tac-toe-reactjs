import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Ciao from "./Ciao";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);