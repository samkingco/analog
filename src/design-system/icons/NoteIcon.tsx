import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const NoteIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12.9844 3.51562L18.5156 9H12.9844V3.51562ZM8.01562 14.0156V12H15.9844V14.0156H8.01562ZM8.01562 18V15.9844H15.9844V18H8.01562ZM6 2.01562C4.92188 2.01562 4.03125 2.90625 4.03125 3.98438L3.98438 20.0156C3.98438 21.0938 4.92188 21.9844 6 21.9844H18C19.0781 21.9844 20.0156 21.0938 20.0156 20.0156V8.01562L14.0156 2.01562H6Z"
      fill={props.color}
    />
  </Svg>
);
