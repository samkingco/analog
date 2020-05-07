import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Title } from "../design-system/Title";
import { theme } from "../theme";
import { ArrowLeftIcon } from "../design-system/icons/ArrowLeftIcon";
import { FilmRollIcon } from "../design-system/icons/FilmRollIcon";
import { CloseIcon } from "../design-system/icons/CloseIcon";
import { Icon } from "../design-system/Icon";

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
      style={[styles.wrapper, { paddingTop: isModal ? 0 : ifIphoneX(44, 0) }]}>
      <View style={styles.topBar}>
        {!showCloseButton && !previous ? <Icon type={FilmRollIcon} /> : null}
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
    minHeight: 44,
    paddingHorizontal: theme.spacing.s8,
  },
  largeTitle: {
    paddingVertical: theme.spacing.s8,
    paddingHorizontal: theme.spacing.s12,
  },
});
