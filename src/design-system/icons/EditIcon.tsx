import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const EditIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M20.7188 7.03125C21.0938 6.65625 21.0938 6 20.7188 5.625L18.375 3.28125C18 2.90625 17.3438 2.90625 16.9688 3.28125L15.1406 5.10938L18.8906 8.85938L20.7188 7.03125ZM3 21H6.75L17.8125 9.9375L14.0625 6.1875L3 17.25V21Z"
      fill={props.color}
    />
  </Svg>
);
