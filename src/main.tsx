import React from "react";
import { createRoot } from "react-dom/client";
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// serviceWorkerRegistration.register();
