import React from "react";
import { StyleSheet } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { cameraBagSelectors } from "../store/camera-bag";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { NavigationHeader } from "../components/NavigationHeader";
import { theme } from "../theme";
import { ContentBlock } from "../design-system/ContentBlock";
import { List } from "../design-system/List";
import { SectionTitle } from "../design-system/SectionTitle";
import { Button } from "../design-system/Button";
import { ListItem } from "../design-system/ListItem";

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

export function CameraBagScreenComponent({ navigation }: Props) {
  const cameras = useSelector(cameraBagSelectors.camerasList);
  const lenses = useSelector(cameraBagSelectors.lensesList);

  return (
    <ScreenBackground>
      <ContentBlock>
        <SectionTitle>Cameras</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={cameras}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <ListItem title={item.name} onPress={() => {}} />
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
            <ListItem title={item.name} onPress={() => {}} />
          )}
        />
        <Button variant="secondary">Add lens</Button>
      </ContentBlock>
    </ScreenBackground>
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
        })}
      >
        <Stack.Screen
          name="CameraBag"
          component={CameraBagScreenComponent}
          options={{
            title: "Camera bag",
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
