import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { AuthContextProvider, useAuthContext } from "./Auth";
import AddQuestion from "./pages/AddQuestion";
import Login from "./pages/Login";
import Test, { loader as testLoader } from "./pages/Test";
import Root from "./Root";
import ThemeProvider from "./Theme";

function ProtectedRoute() {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <AuthContextProvider>
      <Root />
      // </AuthContextProvider>
    ),

    children: [
      {
        path: "/test",
        element: <Test />,
        loader: testLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute />,
        children: [
          {
            path: "addQuestion",
            element: <AddQuestion />,
          },
        ],
      },
    ],
  },
]);

const GlobalStyle = createGlobalStyle`

  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.secondary}
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
