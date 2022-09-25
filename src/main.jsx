import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { loader as appLoader } from "./App";
import Login from "./pages/Login";
import AddQuestion from "./pages/AddQuestion";
import "./index.css";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AddQuestion />,
    // children: [
    //   {
    //     path: "addQuestion",
    //     element: <AddQuestion />,
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
