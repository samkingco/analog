import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationHeader } from "../components/NavigationHeader";
import { AddRollChooseFilmStockScreen } from "./AddRollChooseFilmStock";
import { AddRollChooseCameraScreen } from "./AddRollChooseCameraScreen";
import { theme } from "../theme";
import { View } from "react-native";

export type AddRollStackParamList = {
  AddRollChooseFilmStock: undefined;
  AddRollChooseCamera: undefined;
};

const Stack = createStackNavigator<AddRollStackParamList>();

export function AddRollModalScreen() {
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="AddRollChooseFilmStock"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader isModal={true} {...props} />,
        }}
      >
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
      </Stack.Navigator>
    </View>
  );
}
