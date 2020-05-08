import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { Headline } from "../design-system/Headline";
import { theme } from "../theme";
import { Icon } from "../design-system/Icon";
import { List } from "../design-system/List";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { Button } from "../design-system/Button";
import { rollSelectors, addFrameToRoll } from "../store/rolls";
import { CameraLens, cameraBagSelectors } from "../store/camera-bag";
import { CheckIcon } from "../design-system/icons/CheckIcon";
import { SectionTitle } from "../design-system/SectionTitle";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { HorizontalScrollPicker } from "../design-system/HorizontalScrollPicker";
import {
  shutterSpeeds,
  apertures,
  makeFocalLengths,
} from "../util/camera-settings";

type AddFrameScreenRouteProp = RouteProp<RootStackParamList, "AddFrame">;
type AddFrameNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddFrame"
>;

type AddFrameScreenProps = {
  route: AddFrameScreenRouteProp;
  navigation: AddFrameNavigationProp;
};

interface LensItemProps {
  item: CameraLens;
  navigation: AddFrameNavigationProp;
  isSelected?: boolean;
  onPress: () => void;
}

function LensItem({ item, navigation, isSelected, onPress }: LensItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.listItem}
      onPress={onPress}>
      <View style={styles.listItemContent}>
        <Headline>{item.name}</Headline>
      </View>
      {isSelected ? (
        <View>
          <Icon type={CheckIcon} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export function AddFrameScreen({ route, navigation }: AddFrameScreenProps) {
  const dispatch = useDispatch();
  const { rollId } = route.params;
  const roll = useSelector((s) => rollSelectors.rollById(s, rollId));

  const availableLenses = useSelector((s) =>
    cameraBagSelectors.lensesForCamera(s, roll ? roll.cameraId : ""),
  );
  const [selectedLensId, setSelectedLensId] = useState(
    availableLenses.length > 0 ? availableLenses[0].id : "",
  );
  const selectedLens = availableLenses.find((i) => i.id === selectedLensId);
  const isPrimeLens =
    selectedLens && selectedLens.minFocalLength === selectedLens.maxFocalLength;
  const focalLengths = makeFocalLengths(
    selectedLens ? selectedLens.minFocalLength : 0,
    selectedLens ? selectedLens.maxFocalLength : 0,
  );

  const [shutterSpeed, setShutterSpeed] = useState({
    shutterWhole: 0,
    shutterFraction: 0,
  });
  const [aperture, setAperture] = useState(0);
  const [focalLength, setFocalLength] = useState(
    selectedLens && isPrimeLens ? selectedLens.minFocalLength : 0,
  );
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const selectedFocalLength =
      selectedLens && isPrimeLens ? selectedLens.minFocalLength : 0;
    setFocalLength(selectedFocalLength);
  }, [selectedLensId]);

  const frameToSave = {
    lensId: selectedLensId,
    focalLength,
    aperture,
    ...shutterSpeed,
    notes,
  };

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
                <LensItem
                  item={item}
                  navigation={navigation}
                  onPress={() => setSelectedLensId(item.id)}
                  isSelected={selectedLensId === item.id}
                />
              )}
            />
          </ContentBlock>
          <ContentBlock>
            <HorizontalScrollPicker
              label="Shutter speed"
              items={shutterSpeeds}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) =>
                setShutterSpeed({
                  shutterWhole: item.shutterWhole,
                  shutterFraction: item.shutterFraction,
                })
              }
            />
            <HorizontalScrollPicker
              label="Aperture"
              items={apertures}
              keyExtractor={(i) => i.label}
              renderDisplayValue={(item) => item.label}
              onSelect={(item) => setAperture(item.aperture)}
              style={{ marginTop: theme.spacing.s12 }}
            />
            {isPrimeLens ? (
              <TextInput
                label="Focal length (mm)"
                value={`${focalLength}`}
                onChange={(value) =>
                  value ? setFocalLength(parseInt(value, 10)) : 0
                }
                placeholder={"0"}
                inputProps={{ keyboardType: "number-pad" }}
                style={{ marginTop: theme.spacing.s12 }}
              />
            ) : (
              <HorizontalScrollPicker
                label="Focal length (mm)"
                items={focalLengths}
                keyExtractor={(i) => i.label}
                renderDisplayValue={(item) => item.label}
                onSelect={(item) => setFocalLength(item.focalLength)}
                style={{ marginTop: theme.spacing.s12 }}
              />
            )}
            <TextInput
              label="Notes (optional)"
              value={notes}
              onChange={setNotes}
              placeholder={"Something to identify later"}
              style={{ marginTop: theme.spacing.s12 }}
            />
          </ContentBlock>
          <ContentBlock>
            <Button
              onPress={() => {
                dispatch(addFrameToRoll(frameToSave, rollId));
                navigation.pop();
              }}>
              Save
            </Button>
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
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
