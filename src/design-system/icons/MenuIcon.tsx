import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const GrainIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M20 7H4V9H20V7Z" fill={props.color} />
    <Path d="M20 11H4V13H20V11Z" fill={props.color} />
    <Path d="M4 15H20V17H4V15Z" fill={props.color} />
  </Svg>
);
