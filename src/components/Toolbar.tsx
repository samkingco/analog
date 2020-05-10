import React from "react";
import { SafeAreaView } from "react-native";
import { ContentBlock } from "../design-system/ContentBlock";
import { theme } from "../theme";

interface ToolbarProps {
  children: React.ReactNode;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <ContentBlock
      style={{
        backgroundColor: theme.colors.background.interactive,
      }}
    >
      <SafeAreaView>{props.children}</SafeAreaView>
    </ContentBlock>
  );
}
