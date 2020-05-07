import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ArrowDown = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18.6094 10.5938L12.9844 16.1719V3.98438H11.0156V16.1719L5.4375 10.5938L3.98438 12L12 20.0156L20.0156 12L18.6094 10.5938Z"
      fill={props.color}
    />
  </Svg>
);
