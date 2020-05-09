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
import { NavigationHeader } from "./components/NavigationHeader";
import { RollDetailScreen } from "./screens/RollDetailScreen";
import {
  AddRollScreen,
  ChooseFilmStockScreen,
  ChooseCameraScreen,
} from "./screens/AddRollScreen";
import { FrameDetailScreen } from "./screens/FrameDetailScreen";
import { AddFrameScreen } from "./screens/AddFrameScreen";

export type RootStackParamList = {
  Rolls: undefined;
  RollDetail: { rollId: string };
  AddRoll: undefined;
  AddRollChooseFilmStock: undefined;
  AddRollChooseCamera: undefined;
  AddRollExtraInfo: undefined;
  FrameDetail: { frameId: string; rollId: string };
  AddFrame: { rollId: string };
  CameraBag: undefined;
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
          }}
        >
          <Stack.Screen name="Rolls" component={RollsScreen} />
          <Stack.Screen name="RollDetail" component={RollDetailScreen} />
          <Stack.Screen name="FrameDetail" component={FrameDetailScreen} />
          <Stack.Screen
            name="AddRoll"
            component={AddRollScreen}
            options={{
              header: () => null,
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />
          <Stack.Screen
            name="AddRollChooseFilmStock"
            component={ChooseFilmStockScreen}
            options={{
              title: "Choose film",
            }}
          />
          <Stack.Screen
            name="AddRollChooseCamera"
            component={ChooseCameraScreen}
            options={{
              title: "Choose camera",
            }}
          />
          <Stack.Screen
            name="AddFrame"
            component={AddFrameScreen}
            options={{
              title: "New photo",
            }}
          />
          <Stack.Screen
            name="CameraBag"
            component={CameraBagScreen}
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
