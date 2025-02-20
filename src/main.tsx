import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserTextContextProvider } from "./_contexts/UserPromptContext.tsx";

const summarize_meta = document.createElement("meta");
summarize_meta.httpEquiv = "origin-trial";
summarize_meta.content = import.meta.env.VITE_SUMMARIZATION_TOKEN;
document.head.appendChild(summarize_meta);

const language_detector_meta = document.createElement("meta");
language_detector_meta.httpEquiv = "origin-trial";
language_detector_meta.content = import.meta.env.VITE_LANGUAGE_DETECTOR_TOKEN;
document.head.appendChild(language_detector_meta);

const translator_meta = document.createElement("meta");
translator_meta.httpEquiv = "origin-trial";
translator_meta.content = import.meta.env.VITE_TRANSLATOR_TOKEN;
document.head.appendChild(translator_meta);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserTextContextProvider>
      <App />
    </UserTextContextProvider>
  </StrictMode>
);
