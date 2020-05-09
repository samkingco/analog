import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Title } from "../design-system/Title";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { ArrowLeftIcon } from "../design-system/icons/ArrowLeftIcon";
import { CloseIcon } from "../design-system/icons/CloseIcon";
import { CameraIcon } from "../design-system/icons/CameraIcon";

interface Props extends StackHeaderProps {
  isModal?: boolean;
  isFirstModalView?: boolean;
  parentNavigation?: StackHeaderProps["navigation"];
}

export function NavigationHeader({
  scene,
  previous,
  navigation,
  isModal = false,
  parentNavigation,
}: Props) {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const showCloseButton = Boolean(isModal && !previous);

  return (
    <View
      style={[styles.wrapper, { paddingTop: isModal ? 0 : ifIphoneX(44, 0) }]}
    >
      <View style={styles.topBar}>
        <View>
          {showCloseButton && parentNavigation ? (
            <TouchableOpacity onPress={parentNavigation.goBack}>
              <Icon type={CloseIcon} />
            </TouchableOpacity>
          ) : undefined}
          {previous ? (
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon type={ArrowLeftIcon} />
            </TouchableOpacity>
          ) : undefined}
        </View>
        <View>
          {!showCloseButton && !previous ? (
            <TouchableOpacity onPress={() => navigation.navigate("CameraBag")}>
              <Icon type={CameraIcon} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.largeTitle}>
        <Title>{title}</Title>
      </View>
    </View>
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
