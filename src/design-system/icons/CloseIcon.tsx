import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CloseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.5781 5.01562L12 10.5938L6.42188 5.01562L5.01562 6.42188L10.5938 12L5.01562 17.5781L6.42188 18.9844L12 13.4062L17.5781 18.9844L18.9844 17.5781L13.4062 12L18.9844 6.42188L17.5781 5.01562Z"
      fill={props.color}
    />
  </Svg>
);
