import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { loader as appLoader } from "./App";
import "./index.css";
import AddQuestion from "./pages/AddQuestion";
import Login from "./pages/Login";
import Root from "./Root";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/test",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
