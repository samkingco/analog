import React, { useRef, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Animated } from "react-native";
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
  const highlightedAnimation = useRef(
    new Animated.Value(props.isHighlighted ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(highlightedAnimation, {
      toValue: props.isHighlighted ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [props.isHighlighted]);

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
      <View style={styles.content}>
        {props.pretitle ? (
          <Subhead color={props.isHighlighted ? "invertedSubtle" : undefined}>
            {props.pretitle}
          </Subhead>
        ) : null}
        {props.title ? (
          <Headline color={props.isHighlighted ? "inverted" : undefined}>
            {props.title}
          </Headline>
        ) : null}
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

  return (
    <Animated.View
      style={[
        {
          backgroundColor: highlightedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [
              theme.colors.background.interactive,
              theme.colors.background.inverted,
            ],
          }),
        },
      ]}
    >
      {props.onPress ? (
        <TouchableOpacity
          activeOpacity={props.isHighlighted ? 0.8 : 0.4}
          onPress={props.onPress}
          style={styles.container}
        >
          {content}
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>{content}</View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s12,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  leftIcon: {
    marginRight: theme.spacing.s8,
  },
  rightIcon: {
    marginLeft: theme.spacing.s8,
  },
});
