import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

const firebaseConfig = {
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = React.createContext({
  user: {},
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  //   const auth = getAuth(app);
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

  const login = (username, password) => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return React.useContext(AuthContext);
}
