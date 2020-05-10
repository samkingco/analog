import React from "react";
import { Provider } from "react-redux";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { store } from "./store";
import { theme } from "./theme";
import { NavigationHeader } from "./components/NavigationHeader";
import { RollsStack } from "./screens/RollsStack";
import { AddRollStack } from "./screens/AddRollStack";
import { AddFrameScreen } from "./screens/AddFrameScreen";
import { CameraBagStack } from "./screens/CameraBagStack";
import { AddCameraLensScreen } from "./screens/AddCameraLensScreen";
import { AddCameraScreen } from "./screens/AddCameraScreen";

export type RootStackParamList = {
  RollsStack: undefined;
  AddRollStack: undefined;
  AddFrame: { rollId: string };
  CameraBagStack: undefined;
  AddCamera: undefined;
  AddCameraLens: { cameraId?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <View
          style={{ backgroundColor: theme.colors.background.default, flex: 1 }}
        >
          <Stack.Navigator
            initialRouteName="RollsStack"
            headerMode="screen"
            screenOptions={{
              cardOverlayEnabled: true,
              cardStyle: { backgroundColor: theme.colors.background.default },
              header: (props) => <NavigationHeader {...props} />,
            }}
          >
            <Stack.Screen
              name="RollsStack"
              component={RollsStack}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="AddRollStack"
              component={AddRollStack}
              options={{
                header: () => null,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddFrame"
              component={AddFrameScreen}
              options={{
                title: "New photo",
                header: (props) => (
                  <NavigationHeader
                    isModal={true}
                    isSingleScreenModal={true}
                    {...props}
                  />
                ),
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="CameraBagStack"
              component={CameraBagStack}
              options={{
                header: () => null,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddCamera"
              component={AddCameraScreen}
              options={{
                title: "Add camera",
                header: (props) => (
                  <NavigationHeader
                    isModal={true}
                    isSingleScreenModal={true}
                    {...props}
                  />
                ),
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddCameraLens"
              component={AddCameraLensScreen}
              options={{
                title: "Add lens",
                header: (props) => (
                  <NavigationHeader
                    isModal={true}
                    isSingleScreenModal={true}
                    {...props}
                  />
                ),
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
};
