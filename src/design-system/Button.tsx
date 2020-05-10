import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  Animated,
} from "react-native";
import { theme, Theme } from "../theme";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: keyof Theme["variants"]["button"];
  isDisabled?: boolean;
}

export function Button({
  children,
  style,
  variant = "primary",
  isDisabled = false,
  ...props
}: Props) {
  const disabledAnimation = useRef(new Animated.Value(isDisabled ? 1 : 0))
    .current;

  useEffect(() => {
    Animated.timing(disabledAnimation, {
      toValue: isDisabled ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isDisabled]);

  return (
    <TouchableOpacity
      style={[styles.buttonShape, style]}
      activeOpacity={variant === "primary" ? 0.8 : 0.4}
      disabled={isDisabled || variant === "disabled"}
      {...props}
    >
      <Animated.View
        style={[
          styles.wrapper,
          {
            backgroundColor: disabledAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                theme.variants.button[variant].backgroundColor,
                theme.variants.button.disabled.backgroundColor,
              ],
            }),
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.textBase,
            {
              color: disabledAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  theme.variants.button[variant].color,
                  theme.variants.button.disabled.color,
                ],
              }),
            },
          ]}
        >
          {children}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonShape: {
    borderRadius: theme.misc.borderRadius,
  },
  wrapper: {
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
