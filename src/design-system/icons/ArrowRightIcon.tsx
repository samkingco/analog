import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowRightIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M10.5938 5.39062L16.1719 11.0156H3.98438V12.9844H16.1719L10.5938 18.6094L12 20.0156L20.0156 12L12 3.98438L10.5938 5.39062Z"
      fill={props.color}
    />
  </Svg>
);
