import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
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

type AddRollChooseCameraScreenRouteProp = RouteProp<
  RootStackParamList,
  "AddRollChooseCamera"
>;
type AddRollChooseCameraNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddRollChooseCamera"
>;

type AddRollChooseCameraScreenProps = {
  route: AddRollChooseCameraScreenRouteProp;
  navigation: AddRollChooseCameraNavigationProp;
};

export function AddRollChooseCameraScreen({
  navigation,
}: AddRollChooseCameraScreenProps) {
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
