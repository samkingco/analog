import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { Subhead } from "./Subhead";

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children, ...props }: SectionTitleProps) {
  return (
    <View style={styles.container} {...props}>
      <Subhead>{children}</Subhead>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.s12,
    paddingBottom: theme.spacing.s12,
  },
});
