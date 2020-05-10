import React, { useMemo, useEffect, useState } from "react";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
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
import { rollSelectors, updateFrame, deleteFrame } from "../store/rolls";
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
import { Subhead } from "../design-system/Subhead";
import { RollsScreenStackParamList } from "./RollsStack";
import { Toolbar } from "../components/Toolbar";

export type EditFrameScreenRouteProp = RouteProp<
  RollsScreenStackParamList,
  "EditFrame"
>;
export type EditFrameNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<RollsScreenStackParamList, "EditFrame">
>;

type EditFrameScreenProps = {
  route: EditFrameScreenRouteProp;
  navigation: EditFrameNavigationProp;
};

export function EditFrameScreen({ route, navigation }: EditFrameScreenProps) {
  const dispatch = useDispatch();
  const { rollId, frameId } = route.params;
  const roll = useSelector((s) => rollSelectors.rollById(s, rollId));
  const frame = roll && roll.frames.find((i) => i.id === frameId);

  const [localLensId, setLocalLensId] = useState(frame && frame.lensId);
  const [localShutterSpeed, setLocalShutterSpeed] = useState(
    frame && frame.shutterSpeed,
  );
  const [localAperture, setLocalAperture] = useState(frame && frame.aperture);
  const [localFocalLength, setLocalFocalLength] = useState(
    frame && frame.focalLength,
  );
  const [localNotes, setLocalNotes] = useState(frame && frame.notes);

  const shutterSpeeds = useMemo(() => makeShutterSpeeds(), []);
  const initialShutterSpeedIndex = useMemo(
    () => shutterSpeeds.findIndex((i) => i.value === localShutterSpeed),
    [],
  );

  const apertures = useMemo(() => makeApertures(), []);
  const initialApertureIndex = useMemo(
    () => apertures.findIndex((i) => i.value === localAperture),
    [],
  );

  const availableLenses = useSelector((s) =>
    cameraBagSelectors.lensesForCamera(s, roll ? roll.cameraId : ""),
  );

  const selectedLens = useSelector((s) =>
    cameraBagSelectors.lensById(s, localLensId || ""),
  );

  const focalLengths = useMemo(() => {
    return selectedLens
      ? makeFocalLengths(
          selectedLens.minFocalLength,
          selectedLens.maxFocalLength,
        )
      : [];
  }, [localLensId]);

  const initialFocalLengths = useMemo(
    () => focalLengths.findIndex((i) => i.value === localFocalLength),
    [],
  );

  const isSelectedLensPrime = Boolean(
    selectedLens && selectedLens.minFocalLength === selectedLens.maxFocalLength,
  );

  useEffect(() => {
    const focalLength = selectedLens
      ? selectedLens.minFocalLength
      : availableLenses[0].minFocalLength;
    setLocalFocalLength(focalLength);
  }, [selectedLens]);

  if (!frame) {
    return (
      <ScreenBackground>
        <Subhead>No frame found</Subhead>
      </ScreenBackground>
    );
  }

  navigation.setOptions({ title: `Photo #${frame.frameNumber}` });

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
                    localLensId === item.id ? CheckIcon : BlankIcon
                  }
                  onPress={() => setLocalLensId(item.id)}
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
                setLocalShutterSpeed(item.value);
              }}
            />
            <HorizontalScrollPicker
              label="Aperture"
              items={apertures}
              initialIndex={initialApertureIndex}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => {
                setLocalAperture(item.value);
              }}
              style={{ marginTop: theme.spacing.s12 }}
            />
            {!isSelectedLensPrime && focalLengths.length > 0 ? (
              <HorizontalScrollPicker
                label="Focal length (mm)"
                items={focalLengths}
                initialIndex={initialFocalLengths}
                keyExtractor={(i) => i.label}
                renderDisplayValue={(item) => item.label}
                onSelect={(item) => {
                  setLocalFocalLength(item.value);
                }}
                style={{ marginTop: theme.spacing.s12 }}
              />
            ) : null}
            <TextInput
              label="Notes (optional)"
              value={localNotes || ""}
              onChange={setLocalNotes}
              placeholder={"Something to identify later"}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
        <Toolbar>
          <Button
            onPress={() => {
              dispatch(
                updateFrame(rollId, {
                  ...frame,
                  lensId: localLensId,
                  shutterSpeed: localShutterSpeed,
                  aperture: localAperture,
                  focalLength: localFocalLength,
                  notes: localNotes,
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
              dispatch(deleteFrame(rollId, frame.id));
              navigation.pop();
            }}
            style={{ marginTop: theme.spacing.s12 }}
          >
            Delete frame
          </Button>
        </Toolbar>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
