import React from "react";
import styled from "styled-components";

const InputStyled = styled.input`
  font-size: 1.6rem;
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 5px #999;
`;

export default function Input(props) {
  return <InputStyled type={props.type || "text"} />;
}
