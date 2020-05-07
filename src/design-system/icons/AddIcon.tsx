import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const AddIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18.9844 11.0156H12.9844V5.01562H11.0156V11.0156H5.01562V12.9844H11.0156V18.9844H12.9844V12.9844H18.9844V11.0156Z"
      fill={props.color}
    />
  </Svg>
);
