import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationHeader } from "../components/NavigationHeader";
import { theme } from "../theme";
import { View, TouchableOpacity } from "react-native";
import { RollsScreen } from "./RollsScreen";
import { RollDetailScreen } from "./RollDetailScreen";
import { FrameDetailScreen } from "./FrameDetailScreen";
import { Icon } from "../design-system/Icon";
import { CameraBagIcon } from "../design-system/icons/CameraBagIcon";

export type RollsScreenStackParamList = {
  Rolls: undefined;
  RollDetail: { rollId: string };
  FrameDetail: { frameId: string; rollId: string };
};

const Stack = createStackNavigator<RollsScreenStackParamList>();

export function RollsStack() {
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Rolls"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader {...props} />,
        }}
      >
        <Stack.Screen
          name="Rolls"
          component={RollsScreen}
          options={{
            header: (props) => (
              <NavigationHeader
                headerRight={
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("CameraBagStack")}
                  >
                    <Icon type={CameraBagIcon} />
                  </TouchableOpacity>
                }
                {...props}
              />
            ),
          }}
        />
        <Stack.Screen name="RollDetail" component={RollDetailScreen} />
        <Stack.Screen name="FrameDetail" component={FrameDetailScreen} />
      </Stack.Navigator>
    </View>
  );
}
