import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "../design-system/SafeAreaView";
import { NavigationHeader } from "../components/NavigationHeader";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { ChevronRightIcon } from "../design-system/icons/ChevronRightIcon";
import { List } from "../design-system/List";
import { filmStockSelectors } from "../store/film-stocks";
import { FilmStock } from "../store/film-stock-database";
import { Subhead } from "../design-system/Subhead";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import {
  setTempRollFilmStock,
  setTempRollCamera,
  rollSelectors,
  setTempRollExtraInfo,
  saveTempRoll,
} from "../store/rolls";
import { cameraBagSelectors, Camera } from "../store/camera-bag";

export type AddRollStackParamList = {
  ChooseFilmStock: undefined;
  ChooseCamera: undefined;
  ExtraInfo: undefined;
};

const Stack = createStackNavigator<AddRollStackParamList>();

type AddRollScreenRouteProp = RouteProp<RootStackParamList, "AddRoll">;

type ChooseFilmStockNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "AddRoll">,
  StackNavigationProp<AddRollStackParamList, "ChooseFilmStock">
>;

type ChooseFilmStockScreenProps = {
  route: AddRollScreenRouteProp;
  navigation: ChooseFilmStockNavigationProp;
};

interface FilmStockItemProps {
  item: FilmStock;
  navigation: ChooseFilmStockNavigationProp;
}

function FilmStockItem({ item, navigation }: FilmStockItemProps) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => {
        dispatch(setTempRollFilmStock(item.id));
        navigation.navigate("ChooseCamera");
      }}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
        <Subhead>
          ISO {item.speed}
          {item.type ? `  •  ${item.type}` : null}
        </Subhead>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

export function ChooseFilmStockScreen({
  navigation,
}: ChooseFilmStockScreenProps) {
  const filmStocks = useSelector(filmStockSelectors.filmStocksList);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = filmStocks.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ContentBlock>
          <TextInput
            placeholder="Filter"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </ContentBlock>
        <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
          <ContentBlock>
            <List
              items={filteredList}
              keyExtractor={(i) => i.id}
              renderItem={(item) => (
                <FilmStockItem item={item} navigation={navigation} />
              )}
            />
          </ContentBlock>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ChooseCameraNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "AddRoll">,
  StackNavigationProp<AddRollStackParamList, "ChooseCamera">
>;

type ChooseCameraScreenProps = {
  route: AddRollScreenRouteProp;
  navigation: ChooseCameraNavigationProp;
};

interface CameraItemProps {
  item: Camera;
  navigation: ChooseCameraNavigationProp;
}

function CameraItem({ item, navigation }: CameraItemProps) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={() => {
        dispatch(setTempRollCamera(item.id));
        navigation.navigate("ExtraInfo");
      }}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

export function ChooseCameraScreen({ navigation }: ChooseCameraScreenProps) {
  const cameras = useSelector(cameraBagSelectors.camerasList);

  return (
    <SafeAreaView>
      <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
        <ContentBlock>
          <List
            items={cameras}
            keyExtractor={(i) => i.id}
            renderItem={(item) => (
              <CameraItem item={item} navigation={navigation} />
            )}
          />
        </ContentBlock>
      </ScrollView>
    </SafeAreaView>
  );
}

type ExtraInfoNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "AddRoll">,
  StackNavigationProp<AddRollStackParamList, "ExtraInfo">
>;

type ExtraInfoScreenProps = {
  route: AddRollScreenRouteProp;
  navigation: ExtraInfoNavigationProp;
};

export function ExtraInfoScreen({ navigation }: ExtraInfoScreenProps) {
  const dispatch = useDispatch();
  const tempRoll = useSelector(rollSelectors.tempRoll);
  const camera = useSelector((s) =>
    cameraBagSelectors.cameraById(s, tempRoll.cameraId),
  );
  const [maxFrameCount, setMaxFrameCount] = useState(
    camera ? `${camera.numberOfFrames}` : "0",
  );
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
          <ContentBlock>
            <TextInput
              style={{ marginBottom: theme.spacing.s12 }}
              label="Number of photos on the roll"
              placeholder="0"
              value={maxFrameCount}
              onChange={setMaxFrameCount}
            />
            <TextInput
              label="Notes (optional)"
              placeholder="Keep track of shoot details"
              value={notes}
              onChange={setNotes}
            />
          </ContentBlock>
          <ContentBlock>
            <Button
              onPress={() => {
                dispatch(
                  setTempRollExtraInfo(parseInt(maxFrameCount, 10), notes),
                );
                dispatch(saveTempRoll());
                navigation.navigate("Rolls");
              }}>
              Start shooting
            </Button>
          </ContentBlock>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function AddRollScreen() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="ChooseFilmStock"
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
        })}>
        <Stack.Screen
          name="ChooseFilmStock"
          component={ChooseFilmStockScreen}
          options={{
            title: "Choose film",
          }}
        />
        <Stack.Screen
          name="ChooseCamera"
          component={ChooseCameraScreen}
          options={{
            title: "Choose camera",
          }}
        />
        <Stack.Screen
          name="ExtraInfo"
          component={ExtraInfoScreen}
          options={{
            title: "Extra info",
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
