import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

interface ContentBlockProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ContentBlock({ style, ...props }: ContentBlockProps) {
  return <View style={[styles.container, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
