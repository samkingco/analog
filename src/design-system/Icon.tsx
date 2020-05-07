import React from "react";
import { SvgProps } from "react-native-svg";
import { theme, Theme } from "../theme";

export type IconComponent = (props: SvgProps) => JSX.Element;

interface Props extends SvgProps {
  type: IconComponent;
  color?: keyof Theme["colors"]["icon"];
}

export function Icon({ type: IconComponentFunc, color = "default" }: Props) {
  return <IconComponentFunc color={theme.colors.icon[color]} />;
}
