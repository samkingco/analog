import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M14.0156 6L8.01562 12L14.0156 18L15.4219 16.5938L10.8281 12L15.4219 7.40625L14.0156 6Z"
      fill={props.color}
    />
  </Svg>
);
