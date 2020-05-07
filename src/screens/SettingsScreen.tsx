import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "../design-system/SafeAreaView";
import { Headline } from "../design-system/Headline";
import { AboutScreen } from "./AboutScreen";
import { NavigationHeader } from "../components/NavigationHeader";

export type SettingsStackParamList = {
  Settings: undefined;
  About: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

type SettingsScreenRouteProp = RouteProp<RootStackParamList, "Settings">;
type SettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Settings">,
  StackNavigationProp<SettingsStackParamList, "Settings">
>;

type Props = {
  route: SettingsScreenRouteProp;
  navigation: SettingsScreenNavigationProp;
};

export function SettingsScreenComponent({ navigation }: Props) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Headline>The settings content goes here</Headline>
        <TouchableOpacity onPress={() => navigation.navigate("About")}>
          <Headline>Open about</Headline>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export function SettingsScreen() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Settings"
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
        <Stack.Screen name="Settings" component={SettingsScreenComponent} />
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
