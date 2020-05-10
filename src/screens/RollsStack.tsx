import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationHeader } from "../components/NavigationHeader";
import { theme } from "../theme";
import { View, TouchableOpacity } from "react-native";
import { RollsScreen } from "./RollsScreen";
import { RollDetailScreen } from "./RollDetailScreen";
import { EditFrameScreen } from "./EditFrameScreen";
import { Icon } from "../design-system/Icon";
import { MenuIcon } from "../design-system/icons/MenuIcon";
import { deleteRoll, deleteFrame } from "../store/rolls";
import { DeleteIcon } from "../design-system/icons/DeleteIcon";
import { useDispatch } from "react-redux";

export type RollsScreenStackParamList = {
  Rolls: undefined;
  RollDetail: { rollId: string };
  EditFrame: { frameId: string; rollId: string };
};

const Stack = createStackNavigator<RollsScreenStackParamList>();

export function RollsStack() {
  const dispatch = useDispatch();

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
            title: "Film rolls",
            header: (props) => (
              <NavigationHeader
                headerRight={
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("CameraBagStack")}
                  >
                    <Icon type={MenuIcon} />
                  </TouchableOpacity>
                }
                {...props}
              />
            ),
          }}
        />
        <Stack.Screen
          name="RollDetail"
          component={RollDetailScreen}
          options={({ route, navigation }) => ({
            title: "Roll",
            header: (props) => (
              <NavigationHeader
                {...props}
                headerRight={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteRoll(route.params.rollId));
                      navigation.pop();
                    }}
                  >
                    <Icon type={DeleteIcon} />
                  </TouchableOpacity>
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name="EditFrame"
          component={EditFrameScreen}
          options={({ route, navigation }) => ({
            title: "Photo",
            header: (props) => (
              <NavigationHeader
                {...props}
                headerRight={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        deleteFrame(route.params.rollId, route.params.frameId),
                      );
                      navigation.pop();
                    }}
                  >
                    <Icon type={DeleteIcon} />
                  </TouchableOpacity>
                }
              />
            ),
          })}
        />
      </Stack.Navigator>
    </View>
  );
}
