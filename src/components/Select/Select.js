import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);
  const DownArrow = <Icon id="chevron-down" style={{ "--size": 50 }} />;

  return (
    <SelectComponent
      value={displayedValue}
      onChange={onChange}
      style={{ width: "min-content" }}
    >
      {children}
      {DownArrow}
    </SelectComponent>
  );
};

const SelectComponent = styled.select`
  padding: 12px 16px;
  appearance: none;
  background-color: ${COLORS.transparentGray15};
  border-radius: 8px;
  border: none; /* select html inherently has border of 1px solid black, so might be losing on 2px in height and width with this? */
  color: ${COLORS.gray700};

  &:hover {
    color: ${COLORS.black};
  }
`;

export default Select;
