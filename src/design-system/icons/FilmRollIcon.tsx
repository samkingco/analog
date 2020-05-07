import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const FilmRollIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M18 9V6.98438H20.0156V9H18ZM18 18V15.9844H20.0156V18H18ZM14.0156 9V6.98438H15.9844V9H14.0156ZM14.0156 18V15.9844H15.9844V18H14.0156ZM9.98438 9V6.98438H12V9H9.98438ZM9.98438 18V15.9844H12V18H9.98438ZM14.0156 5.01562C14.0156 3.9375 13.0781 3 12 3H11.0156V2.01562C11.0156 1.45312 10.5469 0.984375 9.98438 0.984375H6C5.4375 0.984375 5.01562 1.45312 5.01562 2.01562V3H3.98438C2.90625 3 2.01562 3.9375 2.01562 5.01562V20.0156C2.01562 21.0938 2.90625 21.9844 3.98438 21.9844H12C13.0781 21.9844 14.0156 21.0938 14.0156 20.0156H21.9844V5.01562H14.0156Z"
      fill={props.color}
    />
  </Svg>
);