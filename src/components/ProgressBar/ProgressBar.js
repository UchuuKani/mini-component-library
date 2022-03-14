/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";
// import { ProgressPlugin } from "webpack";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const BAR_SIZES = {
  small: { "--height": "8px", "--borderRadius": "4px" },
  medium: { "--height": "12px", "--borderRadius": "4px" },
  large: { "--height": "16px", "--borderRadius": "4px" },
};

const WRAPPER_SIZES = {
  small: { "--borderRadius": "2px" },
  medium: { "--borderRadius": "4px" },
  large: { "--borderRadius": "8px" },
};

const ProgressBar = ({ value, size }) => {
  const barStyles = BAR_SIZES[size];
  const wrapperStyles = WRAPPER_SIZES[size];
  console.log("bar sizes?", barStyles, "wrapper sizes", wrapperStyles);
  return (
    <Wrapper
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={wrapperStyles}
      size={size}
    >
      <Bar value={value} style={barStyles} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--borderRadius);
  padding: ${(props) => {
    return props.size === "large" ? "4px" : undefined;
  }};
`;

const Bar = styled.div`
  width: ${(props) => props.value + "%"};
  background-color: ${COLORS.primary};
  height: var(--height);
  border-top-left-radius: var(--borderRadius);
  border-bottom-left-radius: var(--borderRadius);
  border-top-right-radius: ${(props) =>
    props.value > "99" ? "var(--borderRadius)" : undefined};
  border-bottom-right-radius: ${(props) =>
    props.value > "99" ? "var(--borderRadius)" : undefined};
`;

export default ProgressBar;
