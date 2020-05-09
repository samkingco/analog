import React from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { theme, Theme } from "../theme";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: keyof Theme["variants"]["button"];
}

export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: Props) {
  const buttonWrapperStyles = StyleSheet.flatten([
    styles.wrapperBase,
    style,
    {
      backgroundColor: theme.variants.button[variant].backgroundColor,
    },
  ]);
  const buttonTextStyles = StyleSheet.flatten([
    styles.textBase,
    {
      color: theme.variants.button[variant].color,
    },
  ]);

  return (
    <TouchableOpacity
      style={buttonWrapperStyles}
      activeOpacity={variant === "primary" ? 0.8 : 0.4}
      {...props}
    >
      <Text style={buttonTextStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapperBase: {
    padding: theme.spacing.s12,
    borderRadius: theme.misc.borderRadius,
  },
  wrapperPrimary: {
    backgroundColor: theme.variants.button.primary.backgroundColor,
  },
  wrapperSecondary: {
    backgroundColor: theme.variants.button.secondary.backgroundColor,
  },
  textBase: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.m * 1.5,
    textAlign: "center",
  },
  textPrimary: {
    color: theme.variants.button.primary.color,
  },
  textSecondary: {
    color: theme.variants.button.secondary.color,
  },
});
