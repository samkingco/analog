import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../theme";
import { NavigationHeader } from "../components/NavigationHeader";
import { CameraBagListScreen } from "./CameraBagListScreen";

export type CameraBagStackParamList = {
  CameraBagList: undefined;
  CameraDetail: undefined;
  LensDetail: undefined;
};

const Stack = createStackNavigator<CameraBagStackParamList>();

export function CameraBagModalScreen() {
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="CameraBagList"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader isModal={true} {...props} />,
        }}
      >
        <Stack.Screen
          name="CameraBagList"
          component={CameraBagListScreen}
          options={{
            title: "Camera bag",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
