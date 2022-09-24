import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
import "./index.css";

const firebaseConfig = {
  databaseURL: "abc",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
