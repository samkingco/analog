import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { theme } from "../theme";
import { Divider, DividerProps } from "./Divider";

interface Props<T> {
  style?: StyleProp<ViewStyle>;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  dividerColor?: DividerProps["color"];
}

export function List<T>({ style, dividerColor = "dark", ...props }: Props<T>) {
  const containerStyle = StyleSheet.flatten([styles.container, style]);

  if (props.items.length <= 0) {
    return null;
  }

  return (
    <View style={containerStyle}>
      {props.items.map((item, index) => {
        const content = props.renderItem(item, index);

        if (!content) {
          return null;
        }

        return (
          <View key={props.keyExtractor(item, index)}>
            {index !== 0 && <Divider color={dividerColor} />}
            {content}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.misc.borderRadius,
    overflow: "hidden",
  },
});
