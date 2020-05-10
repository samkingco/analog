import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ContentBlock } from "../design-system/ContentBlock";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { Headline } from "../design-system/Headline";
import { TextInput } from "../design-system/TextInput";
import { theme } from "../theme";
import { HorizontalScrollPicker } from "../design-system/HorizontalScrollPicker";
import { makeApertures } from "../util/camera-settings";
import { Button } from "../design-system/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  cameraBagSelectors,
  updateTempCameraLens,
  resetTempCameraLens,
  saveTempCameraLens,
} from "../store/camera-bag";
import { stringToNumber } from "../util/string-to-number";

type AddLensScreenRouteProp = RouteProp<RootStackParamList, "AddLens">;
type AddLensScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddLens"
>;

type AddLensScreenProps = {
  route: AddLensScreenRouteProp;
  navigation: AddLensScreenNavigationProp;
};

export function AddLensScreen({ route, navigation }: AddLensScreenProps) {
  const dispatch = useDispatch();
  const tempCameraLens = useSelector(cameraBagSelectors.tempCameraLens);
  // TODO: Don't allow you to set a max lower than a min
  const apertures = useMemo(() => makeApertures(), []);

  useEffect(() => {
    dispatch(
      updateTempCameraLens({
        minAperture: apertures[0].value,
        maxAperture: apertures[apertures.length - 1].value,
      }),
    );
  }, []);

  const canSubmit = Boolean(
    tempCameraLens.name &&
      tempCameraLens.minFocalLength &&
      tempCameraLens.minAperture &&
      tempCameraLens.maxAperture,
  );

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <TextInput
              label="Name"
              value={tempCameraLens.name}
              onChange={(value) =>
                dispatch(updateTempCameraLens({ name: value }))
              }
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
                  tempCameraLens.minFocalLength === 0
                    ? ""
                    : tempCameraLens.minFocalLength
                }`}
                onChange={(value) =>
                  dispatch(
                    updateTempCameraLens({
                      minFocalLength: stringToNumber(value),
                    }),
                  )
                }
                placeholder={"0"}
                inputProps={{ keyboardType: "number-pad" }}
                style={{ marginRight: theme.spacing.s12 / 2, flex: 1 }}
              />
              <TextInput
                label="Max focal length"
                value={`${
                  tempCameraLens.maxFocalLength === 0
                    ? ""
                    : tempCameraLens.maxFocalLength
                }`}
                onChange={(value) => {
                  dispatch(
                    updateTempCameraLens({
                      maxFocalLength: stringToNumber(value),
                    }),
                  );
                }}
                placeholder={`${tempCameraLens.minFocalLength}`}
                inputProps={{ keyboardType: "number-pad" }}
                style={{ marginLeft: theme.spacing.s12 / 2, flex: 1 }}
              />
            </View>
            <HorizontalScrollPicker
              label="Min aperture"
              items={apertures}
              initialIndex={0}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                dispatch(updateTempCameraLens({ minAperture: item.value }));
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
            <HorizontalScrollPicker
              label="Max aperture"
              items={apertures}
              initialIndex={apertures.length - 1}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                dispatch(updateTempCameraLens({ maxAperture: item.value }));
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ContentBlock>
            <Button
              isDisabled={!canSubmit}
              onPress={() => {
                dispatch(saveTempCameraLens());
                navigation.navigate("CameraBagStack");
              }}
            >
              Add lens
            </Button>
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
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
