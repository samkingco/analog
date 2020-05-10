import React from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  cameraBagSelectors,
  updateTempCamera,
  saveTempCamera,
} from "../store/camera-bag";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { theme } from "../theme";
import { ContentBlock } from "../design-system/ContentBlock";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import { stringToNumber } from "../util/string-to-number";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { BlankIcon } from "../design-system/icons/BlankIcon";

type AddCameraScreenRouteProp = RouteProp<RootStackParamList, "AddCamera">;
type AddCameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddCamera"
>;

type AddCameraScreenProps = {
  route: AddCameraScreenRouteProp;
  navigation: AddCameraScreenNavigationProp;
};

export function AddCameraScreen({ navigation }: AddCameraScreenProps) {
  const dispatch = useDispatch();
  const tempCamera = useSelector(cameraBagSelectors.tempCamera);
  const cameraLenses = useSelector(cameraBagSelectors.lensesList);
  const canSubmit = Boolean(tempCamera.name && tempCamera.numberOfFrames);

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <TextInput
              label="Name"
              value={tempCamera.name}
              onChange={(value) => dispatch(updateTempCamera({ name: value }))}
              placeholder={"e.g. Mamiya 7"}
            />
            <TextInput
              label="Max frame count"
              value={`${
                tempCamera.numberOfFrames === 0 ? "" : tempCamera.numberOfFrames
              }`}
              onChange={(value) =>
                dispatch(
                  updateTempCamera({ numberOfFrames: stringToNumber(value) }),
                )
              }
              placeholder={"0"}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ContentBlock>
            <SectionTitle>Lenses</SectionTitle>
            <List
              items={cameraLenses}
              keyExtractor={(i) => i.id}
              renderItem={(item) => {
                const isSelected = tempCamera.lensIds.includes(item.id);
                return (
                  <ListItem
                    title={item.name}
                    rightIconType={isSelected ? CheckIcon : BlankIcon}
                    onPress={() => {
                      dispatch(
                        updateTempCamera({
                          lensIds: isSelected
                            ? tempCamera.lensIds.filter((id) => id !== item.id)
                            : [...tempCamera.lensIds, item.id],
                        }),
                      );
                    }}
                  />
                );
              }}
            />
          </ContentBlock>
          <ContentBlock>
            <Button
              isDisabled={!canSubmit}
              onPress={() => {
                dispatch(saveTempCamera());
                navigation.navigate("CameraBagStack");
              }}
            >
              Add camera
            </Button>
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
