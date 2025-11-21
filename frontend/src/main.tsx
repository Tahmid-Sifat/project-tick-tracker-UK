import React from "react"; // importing react 
import ReactDOM from "react-dom/client"; // client rendering functions
import App from "./App.tsx"; // the whole React component UI is defined in App.tsx
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);