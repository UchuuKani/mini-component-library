/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: { height: 8, padding: 0, radius: 4 },
  medium: { height: 12, padding: 0, radius: 4 },
  large: { height: 16, padding: 4, radius: 8 },
};

const ProgressBar = ({ value, size }) => {
  const styles = STYLES[size];

  // if an invalid size is passed (did not find size specified in our STYLES object) then throw an exception
  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }

  return (
    <Wrapper
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        "--padding": styles.padding + "px",
        "--radius": styles.radius + "px",
      }}
      size={size}
    >
      {/* 
        adding VisuallyHidden component to try to cover multiple types of screen readers.
        maybe NVDA or JAWS screenreaders would not parse aria-valuenow, aria-valuemin, etc.
      */}
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarWrapper>
        <Bar
          value={value}
          style={{
            "--width": value + "%",
            "--height": styles.height + "px",
          }}
        />
      </BarWrapper>
    </Wrapper>
  );
};

// I did not have the background-color set. Josh points it out in solution vid
const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
  border-radius: var(--radius);
  padding: var(--padding);
  /* Per solution vid: trim off corners (of inner bar) when near full - overflow: hidden; started off being applied to Wrapper, but later on in solution vid
     it gets applied to newly-created BarWrapper component to handle truncating the Bar component at the "large" size
  overflow: hidden;
  */
`;

// this component is used to wrap the Bar component so that for the "large" size ProgressBar, the inner Bar component
// gets rounded off when we approach a completion of 100% (without this, the Bar is just square because of extra padding added
// by Wrapper when it is large. The 'overflow: hidden' property is what is used to truncate the inner Bar when nearing 100% completion)
const BarWrapper = styled.div`
  border-radius: 4px;
  /* Per solution vid: trim off corners (of inner bar) when near full */
  overflow: hidden;
`;

const Bar = styled.div`
  width: var(--width);
  background-color: ${COLORS.primary};
  height: var(--height);
  border-radius: 4px 0 0 4px;
`;

export default ProgressBar;
