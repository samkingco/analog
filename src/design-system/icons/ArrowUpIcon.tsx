import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowUpIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M5.39062 13.4062L11.0156 7.82812V20.0156H12.9844V7.82812L18.5625 13.4062L20.0156 12L12 3.98438L3.98438 12L5.39062 13.4062Z"
      fill={props.color}
    />
  </Svg>
);
