import React from "react";
import styled from "styled-components";

const CheckBoxStyled = styled.input``;

export default function CheckBox(props) {
  return <CheckBoxStyled type="checkbox" {...props} />;
}
