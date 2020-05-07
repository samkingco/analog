import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronUpIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M6 14.0156L7.40625 15.4219L12 10.8281L16.5938 15.4219L18 14.0156L12 8.01562L6 14.0156Z"
      fill={props.color}
    />
  </Svg>
);
