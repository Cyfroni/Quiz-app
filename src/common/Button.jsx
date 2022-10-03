import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: ${({ size }) => (size === "big" ? "2rem 4rem" : "0.5rem 1rem")};
  font-size: ${({ size }) => (size === "big" ? "3rem" : "1.6rem")};
  border-radius: 10px;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.main : "white"};
  color: ${({ primary, theme }) => (primary ? "white" : theme.colors.main)};
  border: none;
  box-shadow: 0 0 5px #999;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.main_lighter};
  }

  &[disabled] {
    background-color: #ddd;
    color: #333;
    cursor: initial;
  }
`;

export default function Button(props) {
  return <ButtonStyled {...props} />;
}
