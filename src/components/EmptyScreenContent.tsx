import React from "react";
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { theme } from "../theme";
import { ContentBlock } from "../design-system/ContentBlock";

interface EmptyScreenContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  centerOffset?: string | number;
}

export function EmptyScreenContent({
  children,
  style,
  centerOffset = "-40%",
}: EmptyScreenContentProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <ContentBlock style={{ marginTop: centerOffset }}>
        {children}
      </ContentBlock>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: theme.spacing.s24,
  },
});
