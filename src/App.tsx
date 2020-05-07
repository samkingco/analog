import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { store } from "./store";
import { RollsScreen } from "./screens/RollsScreen";
import { CameraBagScreen } from "./screens/CameraBagScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { NavigationHeader } from "./components/NavigationHeader";
import { RollDetailScreen } from "./screens/RollDetailScreen";

export type RootStackParamList = {
  Rolls: undefined;
  RollDetail: { rollId: string };
  FrameDetail: { frameId: string };
  CameraBag: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Rolls"
          headerMode="screen"
          screenOptions={{
            gestureEnabled: true,
            cardOverlayEnabled: true,
            header: (props) => <NavigationHeader {...props} />,
          }}>
          <Stack.Screen name="Rolls" component={RollsScreen} />
          <Stack.Screen name="RollDetail" component={RollDetailScreen} />
          <Stack.Screen
            name="CameraBag"
            component={CameraBagScreen}
            options={{
              header: () => null,
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              header: () => null,
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
