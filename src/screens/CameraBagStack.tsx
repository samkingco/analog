import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../theme";
import { NavigationHeader } from "../components/NavigationHeader";
import { CameraBagScreen } from "./CameraBagScreen";
import { EditCameraScreen } from "./EditCameraScreen";
import { EditCameraLensScreen } from "./EditCameraLensScreen";

export type CameraBagStackParamList = {
  CameraBag: undefined;
  EditCamera: { cameraId: string };
  EditCameraLens: { cameraLensId: string };
};

const Stack = createStackNavigator<CameraBagStackParamList>();

export function CameraBagStack() {
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="CameraBag"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader isModal={true} {...props} />,
        }}
      >
        <Stack.Screen
          name="CameraBag"
          component={CameraBagScreen}
          options={{
            title: "Camera bag",
          }}
        />
        <Stack.Screen
          name="EditCamera"
          component={EditCameraScreen}
          options={{
            title: "Camera",
          }}
        />
        <Stack.Screen
          name="EditCameraLens"
          component={EditCameraLensScreen}
          options={{
            title: "Lens",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
