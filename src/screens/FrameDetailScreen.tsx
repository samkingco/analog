import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { ScrollView } from "react-native-gesture-handler";
import { CameraLens } from "../store/camera-bag";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { SectionTitle } from "../design-system/SectionTitle";
import { ScrollViewPadding } from "../components/ScrollViewPadding";

type FrameDetailsScreenRouteProp = RouteProp<RootStackParamList, "FrameDetail">;
type FrameDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FrameDetail"
>;

type FrameDetailsScreenProps = {
  route: FrameDetailsScreenRouteProp;
  navigation: FrameDetailsNavigationProp;
};

interface LensItemProps {
  item: CameraLens;
  navigation: FrameDetailsNavigationProp;
  isSelected?: boolean;
}

function LensItem({ item, navigation, isSelected }: LensItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => {}}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
      </View>
      {isSelected ? (
        <View>
          <Icon type={CheckIcon} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export function FrameDetailScreen({
  route,
  navigation,
}: FrameDetailsScreenProps) {
  const { frameId } = route.params;

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
          <ContentBlock>
            <SectionTitle>yooooo</SectionTitle>
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: theme.spacing.s12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background.interactive,
  },
  listItemContent: {
    flex: 1,
  },
});
