import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 2rem;
`;

const Input = styled.input`
  font-size: 1.6rem;
  padding: 0.5rem;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function InputGroup({ value, onChange, label }) {
  return (
    <Wrapper>
      <Label htmlFor={label}>{label}</Label>
      <Input id={label} type="text" value={value} onChange={onChange} />
    </Wrapper>
  );
}
