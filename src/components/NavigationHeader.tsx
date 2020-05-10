import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Title } from "../design-system/Title";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { ArrowLeftIcon } from "../design-system/icons/ArrowLeftIcon";
import { CloseIcon } from "../design-system/icons/CloseIcon";
import { useNavigationState } from "@react-navigation/native";

interface Props extends StackHeaderProps {
  isModal?: boolean;
  isSingleScreenModal?: boolean;
  headerRight?: React.ReactNode;
}

export function NavigationHeader({
  scene,
  previous,
  navigation,
  isModal,
  isSingleScreenModal,
  headerRight,
}: Props) {
  const isFirstRouteInParent = useNavigationState(
    (state) => state.routes[0].key === scene.route.key,
  );

  const progress = Animated.add(
    scene.progress.current,
    scene.progress.next || 0,
  );

  const opacity = progress.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const showCloseButton = Boolean(
    isModal && (isFirstRouteInParent || isSingleScreenModal),
  );

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { paddingTop: !isModal ? ifIphoneX(44, 0) : 0, opacity },
      ]}
    >
      <View style={styles.topBar}>
        <View>
          {showCloseButton ? (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon type={CloseIcon} />
            </TouchableOpacity>
          ) : undefined}
          {!showCloseButton && previous ? (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon type={ArrowLeftIcon} />
            </TouchableOpacity>
          ) : undefined}
        </View>
        <View>{headerRight ? headerRight : null}</View>
      </View>
      <View style={styles.largeTitle}>
        <Title numberOfLines={1}>{title}</Title>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.background.default,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
    paddingHorizontal: theme.spacing.s8,
  },
  largeTitle: {
    paddingVertical: theme.spacing.s8,
    paddingHorizontal: theme.spacing.s12,
  },
});
