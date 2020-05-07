import React from "react";
import { ScrollView, TouchableOpacity, FlatList } from "react-native";
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
import { cameraBagSelectors } from "../store/camera-bag";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";

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

  return (
    <SafeAreaView>
      <FlatList
        data={cameras}
        renderItem={({ item }) => (
          <ContentBlock>
            <Headline>{item.name}</Headline>
            <Subhead>
              {item.lensIds.length}{" "}
              {item.lensIds.length === 1 ? "lens" : "lenses"}
            </Subhead>
          </ContentBlock>
        )}
        keyExtractor={(i) => i.id}
      />
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
