import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../theme";
import { NavigationHeader } from "../components/NavigationHeader";
import { CameraBagScreen } from "./CameraBagScreen";
import { EditCameraScreen } from "./EditCameraScreen";
import { EditCameraLensScreen } from "./EditCameraLensScreen";
import { CameraDetailScreen } from "./CameraDetailScreen";
import { Icon } from "../design-system/Icon";
import { DeleteIcon } from "../design-system/icons/DeleteIcon";
import { useDispatch } from "react-redux";
import { deleteCamera, deleteCameraLens } from "../store/camera-bag";

export type CameraBagStackParamList = {
  CameraBag: undefined;
  CameraDetail: { cameraId: string };
  EditCamera: { cameraId: string };
  EditCameraLens: { cameraLensId: string };
};

const Stack = createStackNavigator<CameraBagStackParamList>();

export function CameraBagStack() {
  const dispatch = useDispatch();
  return (
    <View style={{ backgroundColor: theme.colors.background.default, flex: 1 }}>
      <Stack.Navigator
        initialRouteName="CameraBag"
        headerMode="float"
        screenOptions={{
          header: (props) => <NavigationHeader isModal={true} {...props} />,
        }}
      >
        <Stack.Screen
          name="CameraBag"
          component={CameraBagScreen}
          options={{
            title: "Camera bag",
          }}
        />
        <Stack.Screen
          name="CameraDetail"
          component={CameraDetailScreen}
          options={{
            title: "Camera",
          }}
        />
        <Stack.Screen
          name="EditCamera"
          component={EditCameraScreen}
          options={({ route, navigation }) => ({
            title: "Camera",
            header: (props) => (
              <NavigationHeader
                isModal={true}
                {...props}
                headerRight={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteCamera(route.params.cameraId));
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
          name="EditCameraLens"
          component={EditCameraLensScreen}
          options={({ route, navigation }) => ({
            title: "Lens",
            header: (props) => (
              <NavigationHeader
                isModal={true}
                {...props}
                headerRight={
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(deleteCameraLens(route.params.cameraLensId));
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
