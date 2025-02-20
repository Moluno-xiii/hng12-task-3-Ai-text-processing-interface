import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserTextContextProvider } from "./_contexts/UserPromptContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserTextContextProvider>
      <App />
    </UserTextContextProvider>
  </StrictMode>
);
