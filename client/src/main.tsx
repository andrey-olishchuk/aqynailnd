import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadThemeVariables } from "./lib/theme-loader";

// Load theme variables before rendering the app
loadThemeVariables();

createRoot(document.getElementById("root")!).render(<App />);