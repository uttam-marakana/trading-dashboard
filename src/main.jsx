import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>,
);
