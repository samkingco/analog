import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { NavigationHeader } from "../components/NavigationHeader";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { List } from "../design-system/List";
import { filmStockSelectors } from "../store/film-stocks";
import { FilmStock } from "../store/film-stock-database";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import { rollSelectors, saveTempRoll, updateTempRoll } from "../store/rolls";
import { cameraBagSelectors, Camera } from "../store/camera-bag";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { BlankIcon } from "../design-system/icons/BlankIcon";
import { SectionTitle } from "../design-system/SectionTitle";
import { ListItem } from "../design-system/ListItem";

export type AddRollStackParamList = {
  AddRollChooseFilmStock: undefined;
  AddRollChooseCamera: undefined;
  AddRollExtraInfo: undefined;
};

const Stack = createStackNavigator<AddRollStackParamList>();

type AddRollScreenRouteProp = RouteProp<RootStackParamList, "AddRoll">;

type ChooseFilmStockNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "AddRoll">,
  StackNavigationProp<AddRollStackParamList, "AddRollChooseFilmStock">
>;

type ChooseFilmStockScreenProps = {
  route: AddRollScreenRouteProp;
  navigation: ChooseFilmStockNavigationProp;
};

export function ChooseFilmStockScreen({
  navigation,
}: ChooseFilmStockScreenProps) {
  const dispatch = useDispatch();
  const filmStocks = useSelector(filmStockSelectors.filmStocksList);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = filmStocks.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ContentBlock>
          <TextInput
            placeholder="Filter"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </ContentBlock>
        <ContentBlock style={{ flex: 1, paddingBottom: 0 }}>
          <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
            <List
              items={filteredList}
              keyExtractor={(i) => i.id}
              renderItem={(item) => (
                <ListItem
                  title={item.name}
                  subtitle={`ISO ${item.speed} ${
                    item.type ? `  •  ${item.type}` : null
                  }`}
                  onPress={() => {
                    dispatch(updateTempRoll({ filmStockId: item.id }));
                    navigation.navigate("AddRollChooseCamera");
                  }}
                />
              )}
            />
            <ScrollViewPadding />
          </ScrollView>
        </ContentBlock>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

type ChooseCameraNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "AddRoll">,
  StackNavigationProp<AddRollStackParamList, "AddRollChooseCamera">
>;

type ChooseCameraScreenProps = {
  route: AddRollScreenRouteProp;
  navigation: ChooseCameraNavigationProp;
};

export function ChooseCameraScreen({ navigation }: ChooseCameraScreenProps) {
  const dispatch = useDispatch();
  const tempRoll = useSelector(rollSelectors.tempRoll);
  const cameras = useSelector(cameraBagSelectors.camerasList);
  const selectedCamera = useSelector((s) =>
    cameraBagSelectors.cameraById(s, tempRoll.cameraId),
  );

  useEffect(() => {
    dispatch(updateTempRoll({ cameraId: cameras[0].id }));
  }, []);

  useEffect(() => {
    dispatch(
      updateTempRoll({
        maxFrameCount: selectedCamera ? selectedCamera.numberOfFrames : 0,
      }),
    );
  }, [selectedCamera]);

  return (
    <ScreenBackground>
      <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
        <ContentBlock>
          <List
            items={cameras}
            keyExtractor={(i) => i.id}
            renderItem={(item) => (
              <ListItem
                title={item.name}
                rightIconType={
                  Boolean(selectedCamera && selectedCamera.id === item.id)
                    ? CheckIcon
                    : BlankIcon
                }
                onPress={() => {
                  dispatch(updateTempRoll({ cameraId: item.id }));
                }}
              />
            )}
          />
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>Extra info</SectionTitle>
          <TextInput
            style={{ marginBottom: theme.spacing.s12 }}
            label="Photos per roll"
            placeholder="0"
            value={`${tempRoll.maxFrameCount}`}
            onChange={(value) =>
              dispatch(
                updateTempRoll({
                  maxFrameCount: parseInt(value, 10),
                }),
              )
            }
            inputProps={{ keyboardType: "number-pad" }}
          />
          <TextInput
            label="Notes (optional)"
            placeholder="Keep track of shoot details"
            value={tempRoll.notes || ""}
            onChange={(value) => dispatch(updateTempRoll({ notes: value }))}
          />
        </ContentBlock>
        <ContentBlock>
          <Button
            onPress={() => {
              dispatch(saveTempRoll());
              navigation.navigate("Rolls");
            }}
          >
            Load it up
          </Button>
        </ContentBlock>
      </ScrollView>
    </ScreenBackground>
  );
}

export function AddRollScreen() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="AddRollChooseFilmStock"
        screenOptions={({ route, navigation }) => ({
          header: (props) => (
            <NavigationHeader
              isModal={true}
              isFirstModalView={
                navigation.dangerouslyGetState().routes.indexOf(route) > 0
              }
              parentNavigation={navigation}
              {...props}
            />
          ),
        })}
      >
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
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: theme.spacing.s12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background.interactive,
  },
  listItemContent: {
    flex: 1,
  },
});
