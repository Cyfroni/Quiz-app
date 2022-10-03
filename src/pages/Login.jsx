import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/test");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <section id="login">
      <InputGroup
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
      />
      <InputGroup
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />
      <button onClick={login}>log in</button>
    </section>
  );
}
