import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const IsoIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M17.0156 15.5156H12V17.0156H17.0156V15.5156ZM5.01562 18.9844L18.9844 5.01562V18.9844H5.01562ZM7.5 7.5V5.48438H9V7.5H11.0156V9H9V11.0156H7.5V9H5.48438V7.5H7.5ZM5.01562 3C3.9375 3 3 3.9375 3 5.01562V18.9844C3 20.0625 3.9375 21 5.01562 21H18.9844C20.0625 21 21 20.0625 21 18.9844V5.01562C21 3.9375 20.0625 3 18.9844 3H5.01562Z"
      fill={props.color}
    />
  </Svg>
);
