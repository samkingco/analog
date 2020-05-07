import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronRightIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8.57812 7.40625L13.1719 12L8.57812 16.5938L9.98438 18L15.9844 12L9.98438 6L8.57812 7.40625Z"
      fill={props.color}
    />
  </Svg>
);
