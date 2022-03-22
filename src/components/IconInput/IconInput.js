import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";

import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const SIZES = {
  small: {
    fontSize: 14 / 16,
    iconSize: 16,
    borderThickness: 1,
    height: 24 / 16,
    // instead of specifying this leftPadding value, could reuse the value of the "height" since we want to form a square (equal length sides)
    // with the padding - will just keep the separate variables to be explicit though
    leftPadding: 24,
  },
  large: {
    fontSize: 18 / 16,
    iconSize: 24,
    borderThickness: 2,
    height: 36 / 16,
    leftPadding: 36,
  },
};
// coded along with solution video
const IconInput = ({ label, icon, width = 250, size, ...delegated }) => {
  // Approach:
  // going to absolutely position Icon inside wrapper and add some padding to Input so that the icon does not overlap input text
  // also want Input to take up the entire available space so the focus outline is visible around the whole composite element?

  // NOTE: the "delegated" rest props will contain whatever props that are being passed to our component that hasn't been pulled out from destructuring params
  // in the case of this example, the placeholder prop is being associated with "delegated", but in practice any of the props we don't pull out with destructuring
  // will be held in "delegated". I don't really like doing this just because it makes it difficult to track where certain props are coming from when reading the code
  // (IMO) but definitely is nice to not manually type every prop

  // NOTE: the Icon is technically sitting in front of our TextInput b/c Icon is abs positioned, but because both elements are being wrapped by our
  // Wrapper element (underlying html is a <labe>), clicking on the Icon will focus our text input (the reasoning for this still isn't quite clear to me)

  const styles = SIZES[size];
  return (
    <Wrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
      {/* make sure that when using CSS variables to apply properties with units, that we actually write out the unit in the variable's value */}
      <IconWrapper style={{ "--size": styles.iconSize + "px" }}>
        <Icon id={icon} size={styles.iconSize} />
      </IconWrapper>

      <TextInput
        {...delegated}
        style={{
          "--width": width / 16 + "rem",
          "--height": styles.height + "rem",
          "--borderThickness": styles.borderThickness + "px",
          "--fontSize": styles.fontSize + "rem",
          "--leftPadding": styles.leftPadding + "px",
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: block;
  position: relative;
  /* setting "color" on the Wrapper to allow Icon to inherit the color, and having the "color" for TextInput inherit color from here as well
     IconWrapper and Icon inherit automatically, but TextInput will not inherit color by default which is why we are adding "color: inherit" to it
  */
  color: ${COLORS.gray700};

  /* also adding the hover color to the wrapper as it is a convenient place to put it. Can pretty safely assume that when we are hovering over
     the Wrapper, that we are also hovering over the TextInput 
  */
  &:hover {
    color: ${COLORS.black};
  }
`;

// IconWrapper used to wrap the Icon to apply absolute positioning so we can position the Icon next to our text input
const IconWrapper = styled.div`
  position: absolute;
  /* positioned element centering trick - we are centering vertically, don't need side margins */
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: var(--size);
`;

const TextInput = styled.input`
  height: var(--height);
  width: var(--width);
  border: none;
  border-bottom: var(--borderThickness) solid ${COLORS.black};
  /* we apply padding-left on the text input to add space for the IconWrapper/Icon combo that is placed to the left of the input */
  padding-left: var(--leftPadding);
  color: inherit;
  /* when specifying font-weight, often times want to actually indicate the number rather than saying bold */
  font-weight: 700;
  font-size: var(--fontSize);
  outline-offset: 2px;

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }
`;

export default IconInput;
