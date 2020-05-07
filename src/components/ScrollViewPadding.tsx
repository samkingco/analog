import React from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "../theme";

export function ScrollViewPadding() {
  return <View style={styles.view} />;
}

const styles = StyleSheet.create({
  view: {
    height: theme.spacing.s32 * 2,
  },
});
