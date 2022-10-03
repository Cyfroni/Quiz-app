import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import AddQuestion from "./pages/AddQuestion";
import Login from "./pages/Login";
import Test, { loader as testLoader } from "./pages/Test";
import Root from "./Root";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

function ProtectedRoute({ props }) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

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

const AuthContext = React.createContext({ user: {} });

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // ...
    } else {
      setUser(null);
      // User is signed out
      // ...
    }
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}

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

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
