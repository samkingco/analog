import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { ContentBlock } from "../design-system/ContentBlock";
import { theme } from "../theme";
import { View } from "react-native";

interface ToolbarProps {
  children: React.ReactNode;
}

export function Toolbar(props: ToolbarProps) {
  const insets = useSafeArea();
  return (
    <ContentBlock
      style={{
        backgroundColor: theme.colors.background.interactive,
      }}
    >
      <View style={{ paddingBottom: insets.bottom }}>{props.children}</View>
    </ContentBlock>
  );
}
