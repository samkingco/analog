import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  cameraBagSelectors,
  updateCamera,
  deleteCamera,
} from "../store/camera-bag";
import { CameraBagStackParamList } from "./CameraBagStack";
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
import { Subhead } from "../design-system/Subhead";
import { Toolbar } from "../components/Toolbar";

type EditCameraScreenRouteProp = RouteProp<
  CameraBagStackParamList,
  "EditCamera"
>;
type EditCameraScreenNavigationProp = StackNavigationProp<
  CameraBagStackParamList,
  "EditCamera"
>;

type EditCameraScreenProps = {
  route: EditCameraScreenRouteProp;
  navigation: EditCameraScreenNavigationProp;
};

export function EditCameraScreen({ route, navigation }: EditCameraScreenProps) {
  const dispatch = useDispatch();
  const { cameraId } = route.params;
  const camera = useSelector((s) => cameraBagSelectors.cameraById(s, cameraId));
  const cameraLenses = useSelector(cameraBagSelectors.lensesList);

  const [localName, setLocalName] = useState((camera && camera.name) || "");
  const [localNumberOfFrames, setLocalNumberOfFrames] = useState(
    (camera && camera.numberOfFrames) || 0,
  );
  const [localLensIds, setLocalLensIds] = useState(
    (camera && camera.lensIds) || [],
  );

  if (!camera) {
    return (
      <ScreenBackground>
        <Subhead>No camera lens found</Subhead>
      </ScreenBackground>
    );
  }

  navigation.setOptions({ title: camera.name });

  const canSubmit = Boolean(camera.name && camera.numberOfFrames);

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <TextInput
              label="Name"
              value={localName}
              onChange={setLocalName}
              placeholder={"e.g. Mamiya 7"}
            />
            <TextInput
              label="Max frame count"
              value={`${localNumberOfFrames === 0 ? "" : localNumberOfFrames}`}
              onChange={(value) =>
                setLocalNumberOfFrames(stringToNumber(value))
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
                const isSelected = localLensIds.includes(item.id);
                return (
                  <ListItem
                    title={item.name}
                    rightIconType={isSelected ? CheckIcon : BlankIcon}
                    onPress={() => {
                      setLocalLensIds(
                        isSelected
                          ? localLensIds.filter((id) => id !== item.id)
                          : [...localLensIds, item.id],
                      );
                    }}
                  />
                );
              }}
            />
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
        <Toolbar>
          <Button
            isDisabled={!canSubmit}
            onPress={() => {
              dispatch(
                updateCamera({
                  ...camera,
                  name: localName,
                  numberOfFrames: localNumberOfFrames,
                  lensIds: localLensIds,
                }),
              );
              navigation.pop();
            }}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onPress={() => {
              dispatch(deleteCamera(camera.id));
              navigation.popToTop();
            }}
            style={{ marginTop: theme.spacing.s12 }}
          >
            Delete camera
          </Button>
        </Toolbar>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
