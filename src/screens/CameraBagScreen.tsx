import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import pluralize from "pluralize";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "../design-system/SafeAreaView";
import { Subhead } from "../design-system/Subhead";
import { AboutScreen } from "./AboutScreen";
import { NavigationHeader } from "../components/NavigationHeader";
import { useSelector } from "react-redux";
import { cameraBagSelectors, Camera, CameraLens } from "../store/camera-bag";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { ChevronRightIcon } from "../design-system/icons/ChevronRightIcon";
import { List } from "../design-system/List";
import { SectionTitle } from "../design-system/SectionTitle";
import { Button } from "../design-system/Button";

export type CameraBagStackParamList = {
  CameraBag: undefined;
  About: undefined;
};

const Stack = createStackNavigator<CameraBagStackParamList>();

type CameraBagScreenRouteProp = RouteProp<RootStackParamList, "CameraBag">;
type CameraBagScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "CameraBag">,
  StackNavigationProp<CameraBagStackParamList, "CameraBag">
>;

type Props = {
  route: CameraBagScreenRouteProp;
  navigation: CameraBagScreenNavigationProp;
};

interface CameraItemProps {
  item: Camera;
  navigation: CameraBagScreenNavigationProp;
}

function CameraItem({ item, navigation }: CameraItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => navigation.navigate("FrameDetail", { frameId: item.id })}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

interface CameraLensItemProps {
  item: CameraLens;
  navigation: CameraBagScreenNavigationProp;
}

function CameraLensItem({ item, navigation }: CameraLensItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => navigation.navigate("FrameDetail", { frameId: item.id })}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

export function CameraBagScreenComponent({ navigation }: Props) {
  const cameras = useSelector(cameraBagSelectors.camerasList);
  const lenses = useSelector(cameraBagSelectors.lensesList);

  return (
    <SafeAreaView>
      <ContentBlock>
        <SectionTitle>Cameras</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={cameras}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <CameraItem item={item} navigation={navigation} />
          )}
        />
        <Button variant="secondary">Add camera</Button>
      </ContentBlock>
      <ContentBlock>
        <SectionTitle>Lenses</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={lenses}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <CameraLensItem item={item} navigation={navigation} />
          )}
        />
        <Button variant="secondary">Add lens</Button>
      </ContentBlock>
    </SafeAreaView>
  );
}

export function CameraBagScreen() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="CameraBag"
        screenOptions={({ route, navigation }) => ({
          header: (props) => (
            <NavigationHeader
              isModal={true}
              isFirstModalView={
                navigation.dangerouslyGetState().routes.indexOf(route) > 0
              }
              parentNavigation={navigation}
              {...props}
            />
          ),
        })}>
        <Stack.Screen
          name="CameraBag"
          component={CameraBagScreenComponent}
          options={{
            title: "Camera bag",
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: "About",
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
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
