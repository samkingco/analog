import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronDownIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 13.1719L7.40625 8.57812L6 9.98438L12 15.9844L18 9.98438L16.5938 8.57812L12 13.1719Z"
      fill={props.color}
    />
  </Svg>
);
