import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import TicTacToe from "./TicTacToe";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <div className="mx-auto max-w-300 p-4 md:p-6">
      <TicTacToe />
    </div>
  </React.StrictMode>,
);
