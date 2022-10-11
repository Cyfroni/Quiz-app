import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../Auth";
import Button from "../common/Button";
import Input from "../common/Input";

const InputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

const LoginStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  margin: 0 auto;
  margin-top: 10rem;
  max-width: 60rem;

  font-size: 3rem;

  button {
    margin: 0 auto;
    margin-top: 8rem;
  }
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const onLogin = () => {
    login(username, password);
    navigate("/");
  };

  return (
    <LoginStyled>
      <InputGroupStyled>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
      </InputGroupStyled>
      <InputGroupStyled>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </InputGroupStyled>
      <Button size="big" onClick={onLogin} primary>
        log in
      </Button>
    </LoginStyled>
  );
}
