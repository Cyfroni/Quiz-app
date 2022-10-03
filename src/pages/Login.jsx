import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import InputGroup from "../common/InputGroup";

const LoginStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin: 0 auto;
  margin-top: 10rem;
  max-width: 60rem;

  font-size: 3rem;

  button {
    width: 50%;

    margin: 0 auto;
    margin-top: 8rem;
  }
`;

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
    <LoginStyled>
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
      <Button onClick={login}>log in</Button>
    </LoginStyled>
  );
}
