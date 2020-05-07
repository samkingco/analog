import React from "react";
import { Theme, theme } from "../theme";
import { StyleSheet, View } from "react-native";

export interface DividerProps {
  color: keyof Theme["colors"]["divider"];
}

export function Divider({ color = "default" }: DividerProps) {
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.divider[color],
      }}
    />
  );
}
