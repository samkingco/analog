import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../theme";
import { NavigationHeader } from "../components/NavigationHeader";
import { AddRollChooseFilmStockScreen } from "./AddRollChooseFilmStock";
import { AddRollInfoScreen } from "./AddRollInfoScreen";

export type AddRollStackParamList = {
  AddRollChooseFilmStock: undefined;
  AddRollInfo: undefined;
};

const Stack = createStackNavigator<AddRollStackParamList>();

export function AddRollStack() {
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
          name="AddRollInfo"
          component={AddRollInfoScreen}
          options={{
            title: "Roll info",
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
