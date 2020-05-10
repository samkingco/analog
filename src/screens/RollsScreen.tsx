import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationHeader } from "../components/NavigationHeader";
import { theme } from "../theme";
import { View, TouchableOpacity } from "react-native";
import { RollsListScreen } from "./RollsListScreen";
import { RollDetailScreen } from "./RollDetailScreen";
import { FrameDetailScreen } from "./FrameDetailScreen";
import { Icon } from "../design-system/Icon";
import { CameraBagIcon } from "../design-system/icons/CameraBagIcon";

export type RollsScreenStackParamList = {
  RollsList: undefined;
  RollDetail: { rollId: string };
  FrameDetail: { frameId: string; rollId: string };
};

const Stack = createStackNavigator<RollsScreenStackParamList>();

export function RollsScreen() {
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="RollsList"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader {...props} />,
        }}
      >
        <Stack.Screen
          name="RollsList"
          component={RollsListScreen}
          options={{
            header: (props) => (
              <NavigationHeader
                headerRight={
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("CameraBagModal")}
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
