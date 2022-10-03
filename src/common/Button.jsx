import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: orangered;
  border: none;
  box-shadow: 0 0 5px #999;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: orange;
  }

  &[disabled] {
    background-color: brown;
    cursor: initial;
  }
`;

export default function Button(props) {
  return <ButtonStyled {...props} />;
}
