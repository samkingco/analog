import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { theme, Theme } from "../theme";

interface HeadlineProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: keyof Theme["colors"]["text"];
}

export function Headline({
  color = "default",
  style,
  ...props
}: HeadlineProps) {
  // TODO: Add inverted prop and change theme colors to be like
  // normal: { default, subtle }
  // inverted: { default, subtle }
  // then animate based on inverted or not
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
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.l,
  },
});
