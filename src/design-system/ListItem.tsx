import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Subhead } from "../design-system/Subhead";
import { Headline } from "../design-system/Headline";
import { Icon, IconComponent } from "../design-system/Icon";
import { ChevronRightIcon } from "../design-system/icons/ChevronRightIcon";
import { theme } from "../theme";

interface ListItemProps {
  pretitle?: string | React.ReactNode;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  onPress?: () => void;
  rightIconType?: IconComponent;
  leftIconType?: IconComponent;
  isHighlighted?: boolean;
}

export function ListItem(props: ListItemProps) {
  let rightIcon;
  if (props.onPress) {
    rightIcon = ChevronRightIcon;
  }
  if (props.rightIconType) {
    rightIcon = props.rightIconType;
  }

  const content = (
    <>
      {props.leftIconType ? (
        <View style={styles.leftIcon}>
          <Icon type={props.leftIconType} color="subtle" />
        </View>
      ) : null}
      <View style={styles.listItemContent}>
        {props.pretitle ? (
          <Subhead color={props.isHighlighted ? "invertedSubtle" : undefined}>
            {props.pretitle}
          </Subhead>
        ) : null}
        <Headline color={props.isHighlighted ? "inverted" : undefined}>
          {props.title}
        </Headline>
        {props.subtitle ? (
          <Subhead color={props.isHighlighted ? "invertedSubtle" : undefined}>
            {props.subtitle}
          </Subhead>
        ) : null}
      </View>
      {rightIcon ? (
        <View style={styles.rightIcon}>
          <Icon type={rightIcon} color="subtle" />
        </View>
      ) : null}
    </>
  );

  if (props.onPress) {
    return (
      <TouchableOpacity
        activeOpacity={props.isHighlighted ? 0.8 : 0.4}
        style={[
          styles.listItemBase,
          props.isHighlighted
            ? styles.listItemHighlighted
            : styles.listItemDefault,
        ]}
        onPress={props.onPress}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.listItemBase,
        props.isHighlighted
          ? styles.listItemHighlighted
          : styles.listItemDefault,
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  listItemBase: {
    padding: theme.spacing.s12,
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDefault: {
    backgroundColor: theme.colors.background.interactive,
  },
  listItemHighlighted: {
    backgroundColor: theme.colors.background.inverted,
  },
  listItemContent: {
    flex: 1,
  },
  leftIcon: {
    marginRight: theme.spacing.s8,
  },
  rightIcon: {
    marginLeft: theme.spacing.s8,
  },
});
