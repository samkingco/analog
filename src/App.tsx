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
import { CameraBagModalScreen } from "./screens/CameraBagModalScreen";
import { AddLensScreen } from "./screens/AddLensScreen";
import { AddRollModalScreen } from "./screens/AddRollModalScreen";
import { RollsScreen } from "./screens/RollsScreen";
import { AddFrameModalScreen } from "./screens/AddFrameModalScreen";

export type RootStackParamList = {
  Rolls: undefined;
  AddRollModal: undefined;
  AddFrameModal: { rollId: string };
  CameraBagModal: undefined;
  AddLens: undefined;
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
            initialRouteName="Rolls"
            headerMode="screen"
            screenOptions={{
              cardOverlayEnabled: true,
              cardStyle: { backgroundColor: theme.colors.background.default },
              header: (props) => <NavigationHeader {...props} />,
            }}
          >
            <Stack.Screen
              name="Rolls"
              component={RollsScreen}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="AddRollModal"
              component={AddRollModalScreen}
              options={{
                header: () => null,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddFrameModal"
              component={AddFrameModalScreen}
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
              name="CameraBagModal"
              component={CameraBagModalScreen}
              options={{
                header: () => null,
                ...TransitionPresets.ModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="AddLens"
              component={AddLensScreen}
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
