import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ContentBlock } from "../design-system/ContentBlock";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { TextInput } from "../design-system/TextInput";
import { theme } from "../theme";
import { HorizontalScrollPicker } from "../design-system/HorizontalScrollPicker";
import { makeApertures } from "../util/camera-settings";
import { Button } from "../design-system/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  cameraBagSelectors,
  updateCameraLens,
  deleteCameraLens,
} from "../store/camera-bag";
import { stringToNumber } from "../util/string-to-number";
import { CameraBagStackParamList } from "./CameraBagStack";
import { Subhead } from "../design-system/Subhead";
import { Toolbar } from "../components/Toolbar";

type EditCameraLensScreenRouteProp = RouteProp<
  CameraBagStackParamList,
  "EditCameraLens"
>;
type EditCameraLensScreenNavigationProp = StackNavigationProp<
  CameraBagStackParamList,
  "EditCameraLens"
>;

type EditCameraLensScreenProps = {
  route: EditCameraLensScreenRouteProp;
  navigation: EditCameraLensScreenNavigationProp;
};

const apertures = makeApertures();

export function EditCameraLensScreen({
  route,
  navigation,
}: EditCameraLensScreenProps) {
  const { cameraLensId } = route.params;
  const dispatch = useDispatch();
  const cameraLens = useSelector((s) =>
    cameraBagSelectors.lensById(s, cameraLensId),
  );

  const [localName, setLocalName] = useState(
    (cameraLens && cameraLens.name) || "",
  );
  const [localMinFocalLength, setLocalMinFocalLength] = useState(
    cameraLens && cameraLens.minFocalLength,
  );
  const [localMaxFocalLength, setLocalMaxFocalLength] = useState(
    cameraLens && cameraLens.maxFocalLength !== cameraLens.minFocalLength
      ? cameraLens.maxFocalLength
      : 0,
  );
  const [localMinAperture, setLocalMinAperture] = useState(
    cameraLens && cameraLens.minAperture,
  );
  const [localMaxAperture, setLocalMaxAperture] = useState(
    cameraLens && cameraLens.maxAperture,
  );

  if (!cameraLens) {
    return (
      <ScreenBackground>
        <Subhead>No camera lens found</Subhead>
      </ScreenBackground>
    );
  }

  const minApertureIndex = apertures.findIndex(
    (i) => i.value === localMinAperture,
  );
  const maxApertureIndex = apertures.findIndex(
    (i) => i.value === localMaxAperture,
  );

  navigation.setOptions({ title: cameraLens.name });

  const canSubmit = Boolean(
    localName && localMinFocalLength && localMinAperture && localMaxAperture,
  );

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <TextInput
              label="Name"
              value={localName}
              onChange={setLocalName}
              placeholder={"e.g. Mamiya 43mm f/4.5"}
            />
            <View
              style={[
                styles.doubleInputWrapper,
                { marginTop: theme.spacing.s12 },
              ]}
            >
              <TextInput
                label="Min focal length"
                value={`${
                  localMinFocalLength === 0 ? "" : localMinFocalLength
                }`}
                onChange={(value) => {
                  setLocalMinFocalLength(stringToNumber(value));
                }}
                placeholder={"0"}
                inputProps={{ keyboardType: "number-pad" }}
                style={{ marginRight: theme.spacing.s12 / 2, flex: 1 }}
              />
              <TextInput
                label="Max focal length"
                value={`${
                  localMaxFocalLength === 0 ? "" : localMaxFocalLength
                }`}
                onChange={(value) => {
                  setLocalMaxFocalLength(stringToNumber(value));
                }}
                placeholder={`${localMinFocalLength}`}
                inputProps={{ keyboardType: "number-pad" }}
                style={{ marginLeft: theme.spacing.s12 / 2, flex: 1 }}
              />
            </View>
            <HorizontalScrollPicker
              label="Min aperture"
              items={apertures}
              initialIndex={minApertureIndex}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                setLocalMinAperture(item.value);
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
            <HorizontalScrollPicker
              label="Max aperture"
              items={apertures}
              initialIndex={maxApertureIndex}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                setLocalMaxAperture(item.value);
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
      <Toolbar>
        <Button
          isDisabled={!canSubmit}
          onPress={() => {
            dispatch(
              updateCameraLens({
                ...cameraLens,
                name: localName,
                minFocalLength: localMinFocalLength,
                maxFocalLength: localMaxFocalLength,
                minAperture: localMinAperture,
                maxAperture: localMaxAperture,
              }),
            );
            navigation.goBack();
          }}
        >
          Save
        </Button>
        <Button
          variant="danger"
          onPress={() => {
            dispatch(deleteCameraLens(cameraLens.id));
            navigation.goBack();
          }}
          style={{ marginTop: theme.spacing.s12 }}
        >
          Delete lens
        </Button>
      </Toolbar>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  doubleInputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
