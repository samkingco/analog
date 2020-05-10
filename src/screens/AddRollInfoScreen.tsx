import React, { useEffect } from "react";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenBackground } from "../components/ScreenBackground";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { theme } from "../theme";
import { List } from "../design-system/List";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import { rollSelectors, saveTempRoll, updateTempRoll } from "../store/rolls";
import { cameraBagSelectors } from "../store/camera-bag";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { BlankIcon } from "../design-system/icons/BlankIcon";
import { SectionTitle } from "../design-system/SectionTitle";
import { ListItem } from "../design-system/ListItem";
import { AddRollStackParamList } from "./AddRollStack";
import { RootStackParamList } from "../App";
import { makePushPull } from "../util/camera-settings";
import { HorizontalScrollPicker } from "../design-system/HorizontalScrollPicker";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { Toolbar } from "../components/Toolbar";

type AddRollInfoScreenRouteProp = RouteProp<
  AddRollStackParamList,
  "AddRollInfo"
>;
type AddRollInfoNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<AddRollStackParamList, "AddRollInfo">
>;

type AddRollInfoScreenProps = {
  route: AddRollInfoScreenRouteProp;
  navigation: AddRollInfoNavigationProp;
};

const pushPullValues = makePushPull();

export function AddRollInfoScreen({ navigation }: AddRollInfoScreenProps) {
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
      <KeyboardAvoidingView>
        <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
          <ContentBlock>
            <SectionTitle>Camera</SectionTitle>
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
            <SectionTitle>Film</SectionTitle>
            <TextInput
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
            <HorizontalScrollPicker
              items={pushPullValues}
              keyExtractor={(i) => i}
              label="Push or pull"
              onSelect={(value) =>
                dispatch(
                  updateTempRoll({
                    pushPull: value,
                  }),
                )
              }
              initialIndex={pushPullValues.indexOf(0)}
              renderDisplayValue={(i) => {
                if (i < 0) {
                  return `Pull ${i * -1} ${i === -1 ? "stop" : "stops"}`;
                }
                if (i > 0) {
                  return `Push ${i} ${i === 1 ? "stop" : "stops"}`;
                }
                return "None";
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
            <TextInput
              label="Notes (optional)"
              placeholder="Keep track of shoot details"
              value={tempRoll.notes || ""}
              onChange={(value) => dispatch(updateTempRoll({ notes: value }))}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
        <Toolbar>
          <Button
            onPress={() => {
              dispatch(saveTempRoll());
              navigation.navigate("RollsStack");
            }}
          >
            Load it up
          </Button>
        </Toolbar>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
