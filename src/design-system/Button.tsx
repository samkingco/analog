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
import { theme } from "../theme";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  children,
  style,
  ...props
}: Props) {
  const buttonWrapperStyles: StyleProp<ViewStyle>[] = [
    style,
    styles.wrapperBase,
  ];
  const buttonTextStyles: StyleProp<TextStyle>[] = [styles.textBase];

  if (variant === "primary") {
    buttonWrapperStyles.push(styles.wrapperPrimary);
    buttonTextStyles.push(styles.textPrimary);
  }

  if (variant === "secondary") {
    buttonWrapperStyles.push(styles.wrapperSecondary);
    buttonTextStyles.push(styles.textSecondary);
  }

  return (
    <TouchableOpacity
      style={buttonWrapperStyles}
      activeOpacity={variant === "primary" ? 0.8 : 0.4}
      {...props}>
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
    backgroundColor: theme.colors.button.primary.background,
  },
  wrapperSecondary: {
    backgroundColor: theme.colors.button.secondary.background,
  },
  textBase: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.m * 1.5,
    textAlign: "center",
  },
  textPrimary: {
    color: theme.colors.button.primary.text,
  },
  textSecondary: {
    color: theme.colors.button.secondary.text,
  },
});
