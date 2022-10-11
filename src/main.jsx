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

function NotFoundPage() {
  return <div>Not found!</div>;
}

function ProtectedRoute() {
  const { user } = useAuthContext();

  if (!user) return <NotFoundPage />;

  return <Outlet />;
}

function AdminRoute() {
  const { isAdmin } = useAuthContext();

  if (!isAdmin) return <NotFoundPage />;

  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function LoginRoute() {
  const { user } = useAuthContext();

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <div>Hello human</div>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },

      {
        path: "login",
        element: <LoginRoute />,
        children: [
          {
            path: "",
            element: <Login />,
          },
        ],
      },

      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          {
            path: "test",
            element: <Test />,
            loader: testLoader,
          },
        ],
      },

      {
        path: "admin",
        element: <AdminRoute />,
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

    /* color-scheme: light dark; */
    /* color: rgba(255, 255, 255, 0.87); */
    /* background-color: #242424; */

    color: #213547;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
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
    background-color: ${({ theme }) => theme.colors.bg_color}
  }

  /* @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  } */
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
