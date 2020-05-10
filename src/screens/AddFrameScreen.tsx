import React, { useMemo, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { theme } from "../theme";
import { List } from "../design-system/List";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import { rollSelectors, updateTempFrame, saveTempFrame } from "../store/rolls";
import { cameraBagSelectors } from "../store/camera-bag";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { SectionTitle } from "../design-system/SectionTitle";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { HorizontalScrollPicker } from "../design-system/HorizontalScrollPicker";
import { ListItem } from "../design-system/ListItem";
import { BlankIcon } from "../design-system/icons/BlankIcon";
import {
  makeShutterSpeeds,
  makeApertures,
  makeFocalLengths,
} from "../util/camera-settings";
import { SafeAreaView } from "react-native";
import { Toolbar } from "../components/Toolbar";

type AddFrameScreenRouteProp = RouteProp<RootStackParamList, "AddFrame">;
type AddFrameNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddFrame"
>;

type AddFrameScreenProps = {
  route: AddFrameScreenRouteProp;
  navigation: AddFrameNavigationProp;
};

export function AddFrameScreen({ route, navigation }: AddFrameScreenProps) {
  const dispatch = useDispatch();
  const { rollId } = route.params;
  const roll = useSelector((s) => rollSelectors.rollById(s, rollId));
  const prevFrame = roll && roll.frames[roll.frames.length - 1];
  const tempFrame = useSelector(rollSelectors.tempFrame);
  const [hasChangedLens, setHasChangedLens] = useState(false);

  const shutterSpeeds = useMemo(() => makeShutterSpeeds(), []);
  const initialShutterSpeedIndex = useMemo(
    () =>
      shutterSpeeds.findIndex(
        (i) => i.value === (prevFrame ? prevFrame.shutterSpeed : 1 / 125),
      ),
    [],
  );

  const apertures = useMemo(() => makeApertures(), []);
  const initialApertureIndex = useMemo(
    () =>
      apertures.findIndex(
        (i) => i.value === (prevFrame ? prevFrame.aperture : 8),
      ),
    [],
  );

  const availableLenses = useSelector((s) =>
    cameraBagSelectors.lensesForCamera(s, roll ? roll.cameraId : ""),
  );

  const initialLensId = prevFrame ? prevFrame.lensId : availableLenses[0].id;
  const selectedLens = useSelector((s) =>
    cameraBagSelectors.lensById(s, tempFrame.lensId),
  );

  const focalLengths = useMemo(() => {
    return selectedLens
      ? makeFocalLengths(
          selectedLens.minFocalLength,
          selectedLens.maxFocalLength,
        )
      : [];
  }, [tempFrame.lensId]);

  const initialFocalLength = useMemo(() => {
    const foundIndex = focalLengths.findIndex(
      (i) => i.value === (prevFrame && prevFrame.focalLength),
    );
    return foundIndex === -1 ? 0 : foundIndex;
  }, [tempFrame.lensId]);

  const isSelectedLensPrime = Boolean(
    selectedLens && selectedLens.minFocalLength === selectedLens.maxFocalLength,
  );

  useEffect(() => {
    dispatch(updateTempFrame({ lensId: initialLensId }));
  }, []);

  useEffect(() => {
    const focalLength = selectedLens
      ? selectedLens.minFocalLength
      : availableLenses[0].minFocalLength;
    dispatch(updateTempFrame({ focalLength }));
  }, [selectedLens]);

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <SectionTitle>Lens</SectionTitle>
            <List
              items={availableLenses}
              keyExtractor={(i) => i.id}
              renderItem={(item) => (
                <ListItem
                  title={item.name}
                  rightIconType={
                    tempFrame.lensId === item.id ? CheckIcon : BlankIcon
                  }
                  onPress={() => {
                    setHasChangedLens(true);
                    dispatch(updateTempFrame({ lensId: item.id }));
                  }}
                />
              )}
            />
          </ContentBlock>
          <ContentBlock>
            <SectionTitle>Meta</SectionTitle>
            <HorizontalScrollPicker
              label="Shutter speed"
              items={shutterSpeeds}
              initialIndex={initialShutterSpeedIndex}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                dispatch(updateTempFrame({ shutterSpeed: item.value }));
              }}
            />
            <HorizontalScrollPicker
              label="Aperture"
              items={apertures}
              initialIndex={initialApertureIndex}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                dispatch(updateTempFrame({ aperture: item.value }));
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
            {!isSelectedLensPrime && focalLengths.length > 0 ? (
              <HorizontalScrollPicker
                label="Focal length (mm)"
                items={focalLengths}
                initialIndex={hasChangedLens ? 0 : initialFocalLength}
                keyExtractor={(i) => i.label}
                renderDisplayValue={(item) => item.label}
                onSelect={(item) => {
                  dispatch(updateTempFrame({ focalLength: item.value }));
                }}
                style={{ marginTop: theme.spacing.s12 }}
              />
            ) : null}
            <TextInput
              label="Notes (optional)"
              value={tempFrame.notes || ""}
              onChange={(notes) => {
                dispatch(updateTempFrame({ notes }));
              }}
              placeholder={"Something to identify later"}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
      <Toolbar>
        <Button
          onPress={() => {
            dispatch(saveTempFrame(rollId));
            navigation.pop();
          }}
        >
          Save
        </Button>
      </Toolbar>
    </ScreenBackground>
  );
}
