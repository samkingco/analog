import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const DeleteIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15.5156 3.98438L14.4844 3H9.51562L8.48438 3.98438H5.01562V6H18.9844V3.98438H15.5156ZM6 18.9844C6 20.0625 6.9375 21 8.01562 21H15.9844C17.0625 21 18 20.0625 18 18.9844V6.98438H6V18.9844Z"
      fill={props.color}
    />
  </Svg>
);
