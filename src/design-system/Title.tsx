import React from "react";
import { Text, TextProperties, StyleSheet } from "react-native";
import { theme, Theme } from "../theme";

interface TitleProps extends TextProperties {
  children: React.ReactNode;
  color?: keyof Theme["colors"]["text"];
}

export function Title({ color = "default", ...props }: TitleProps) {
  const textStyle = StyleSheet.flatten([
    styles.text,
    {
      color: theme.colors.text[color],
    },
  ]);

  return <Text style={textStyle} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.display,
    fontSize: theme.fontSizes.l,
    lineHeight: theme.fontSizes.l * 1.5,
  },
});
