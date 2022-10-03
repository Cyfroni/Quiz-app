import React from "react";
import styled from "styled-components";

const InputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 2rem;
  }

  input {
    font-size: 1.6rem;
    padding: 0.5rem;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 5px #999;
  }
`;

export default function InputGroup({ value, onChange, label }) {
  return (
    <InputGroupStyled>
      <label htmlFor={label}>{label}</label>
      <input id={label} type="text" value={value} onChange={onChange} />
    </InputGroupStyled>
  );
}
