import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { NavigationHeader } from "./components/NavigationHeader";
import { RollsScreen } from "./screens/RollsScreen";
import { AddRollChooseFilmStockScreen } from "./screens/AddRollChooseFilmStock";
import { AddRollChooseCameraScreen } from "./screens/AddRollChooseCameraScreen";
import { RollDetailScreen } from "./screens/RollDetailScreen";
import { FrameDetailScreen } from "./screens/FrameDetailScreen";
import { AddFrameScreen } from "./screens/AddFrameScreen";
import { CameraBagScreen } from "./screens/CameraBagScreen";
import { AddLensScreen } from "./screens/AddLensScreen";

export type RootStackParamList = {
  Rolls: undefined;
  RollDetail: { rollId: string };
  AddRollChooseFilmStock: undefined;
  AddRollChooseCamera: undefined;
  FrameDetail: { frameId: string; rollId: string };
  AddFrame: { rollId: string };
  CameraBag: undefined;
  AddLens: undefined;
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
            name="AddRollChooseFilmStock"
            component={AddRollChooseFilmStockScreen}
            options={{
              title: "Choose film",
            }}
          />
          <Stack.Screen
            name="AddRollChooseCamera"
            component={AddRollChooseCameraScreen}
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
              title: "Camera bag",
            }}
          />
          <Stack.Screen
            name="AddLens"
            component={AddLensScreen}
            options={{
              title: "Add lens",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
