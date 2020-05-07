import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowLeftIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M7.82812 11.0156L13.4062 5.39062L12 3.98438L3.98438 12L12 20.0156L13.4062 18.6094L7.82812 12.9844H20.0156V11.0156H7.82812Z"
      fill={props.color}
    />
  </Svg>
);
