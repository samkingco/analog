import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { theme, Theme } from "../theme";

interface SubheadProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: keyof Theme["colors"]["text"];
}

export function Subhead({ color = "subtle", style, ...props }: SubheadProps) {
  const textStyle = StyleSheet.flatten([
    styles.text,
    {
      color: theme.colors.text[color],
    },
    style,
  ]);

  return <Text style={textStyle} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.normal,
    fontSize: theme.fontSizes.s,
    lineHeight: theme.fontSizes.s * 1.5,
  },
});
