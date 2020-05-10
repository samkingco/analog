import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { RootStackParamList } from "../App";
import {
  rollSelectors,
  Frame,
  toggleComplete,
  toggleProcessed,
  resetTempFrame,
  resumeShooting,
} from "../store/rolls";
import { filmStockSelectors } from "../store/film-stocks";
import { cameraBagSelectors } from "../store/camera-bag";
import { ScreenBackground } from "../components/ScreenBackground";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { theme } from "../theme";
import { ContentBlock } from "../design-system/ContentBlock";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { IconComponent } from "../design-system/Icon";
import { IsoIcon } from "../design-system/icons/IsoIcon";
import { ContrastIcon } from "../design-system/icons/ContrastIcon";
import { GrainIcon } from "../design-system/icons/GrainIcon";
import { CameraIcon } from "../design-system/icons/CameraIcon";
import { NoteIcon } from "../design-system/icons/NoteIcon";
import { Subhead } from "../design-system/Subhead";
import { Button } from "../design-system/Button";
import { ListItem } from "../design-system/ListItem";
import { LensIcon } from "../design-system/icons/LensIcon";
import {
  formatShutterSpeed,
  formatAperture,
  formatFocalLength,
} from "../util/camera-settings";
import { RollsScreenStackParamList } from "./RollsStack";
import { FilmRollIcon } from "../design-system/icons/FilmRollIcon";

export type RollDetailScreenRouteProp = RouteProp<
  RollsScreenStackParamList,
  "RollDetail"
>;
export type RollDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<RollsScreenStackParamList, "RollDetail">
>;

type Props = {
  route: RollDetailScreenRouteProp;
  navigation: RollDetailScreenNavigationProp;
};

interface FrameListItem extends Frame {
  frameNumber: number;
  maxFrameCount: number;
}

interface InfoItem {
  icon?: IconComponent;
  label: string;
}

export function RollDetailScreen({ route, navigation }: Props) {
  const { rollId } = route.params;
  const dispatch = useDispatch();

  const roll = useSelector((s) => rollSelectors.rollById(s, rollId));

  const filmStock = useSelector((s) =>
    filmStockSelectors.filmStockById(s, roll ? roll.filmStockId : ""),
  );

  const camera = useSelector((s) =>
    cameraBagSelectors.cameraById(s, roll ? roll.cameraId : ""),
  );

  if (!roll) {
    return (
      <ScreenBackground>
        <Subhead>No roll found</Subhead>
      </ScreenBackground>
    );
  }

  navigation.setOptions({ title: roll.filmStockName });

  const frameList = roll.frames;

  const importantInfo: InfoItem[] = [];
  const dateInfo: InfoItem[] = [];
  const filmMetaInfo: InfoItem[] = [];

  if (roll.notes) {
    importantInfo.push({
      icon: NoteIcon,
      label: roll.notes,
    });
  }

  if (filmStock) {
    let pushPullString;
    if (roll.pushPull < 0) {
      pushPullString = `Pulled ${roll.pushPull * -1} ${
        roll.pushPull === -1 ? "stop" : "stops"
      }`;
    }
    if (roll.pushPull > 0) {
      pushPullString = `Pushed ${roll.pushPull} ${
        roll.pushPull === 1 ? "stop" : "stops"
      }`;
    }
    importantInfo.push({
      icon: IsoIcon,
      label: `ISO ${filmStock.speed}${
        pushPullString ? `  •  ${pushPullString}` : ""
      }`,
    });

    if (filmStock.process || filmStock.type) {
      const label = [
        filmStock.type,
        filmStock.process !== "B&W" && filmStock.process,
      ]
        .filter(Boolean)
        .join(`  •  `);
      filmMetaInfo.push({
        icon: FilmRollIcon,
        label,
      });
    }

    if (filmStock.contrast) {
      filmMetaInfo.push({
        icon: ContrastIcon,
        label: `${filmStock.contrast} contrast`,
      });
    }

    if (filmStock.grain) {
      filmMetaInfo.push({
        icon: GrainIcon,
        label: `${filmStock.grain} grain`,
      });
    }
  }

  if (camera) {
    importantInfo.push({
      icon: CameraIcon,
      label: camera.name,
    });
  }

  if (roll.dateLoaded) {
    dateInfo.push({
      label: `Loaded ${format(roll.dateLoaded, "do MMMM")}`,
    });
  }

  if (roll.dateCompleted) {
    dateInfo.push({
      label: `Finished ${format(roll.dateCompleted, "do MMMM")}`,
    });
  }

  if (roll.dateProcessed) {
    dateInfo.push({
      label: `Processed ${format(roll.dateProcessed, "do MMMM")}`,
    });
  }

  return (
    <ScreenBackground>
      <ScrollView style={{ flex: 1 }}>
        <ContentBlock>
          <List
            items={importantInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <ListItem
                leftIconType={item.icon ? item.icon : undefined}
                title={item.label}
              />
            )}
          />
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>
            Photos
            {!roll.isComplete && !roll.isProcessed
              ? `  •  ${roll.maxFrameCount - roll.framesTaken} left`
              : ""}
          </SectionTitle>
          {roll.hasFramesLeft && !roll.isComplete && !roll.isProcessed ? (
            <Button
              variant="primary"
              style={{ marginBottom: theme.spacing.s12 }}
              onPress={() => {
                dispatch(resetTempFrame);
                navigation.navigate("AddFrame", { rollId: roll.id });
              }}
            >
              New photo
            </Button>
          ) : null}
          {roll.isComplete && !roll.isProcessed ? (
            <Button
              variant="primary"
              style={{ marginBottom: theme.spacing.s12 }}
              onPress={() => dispatch(toggleProcessed(roll.id))}
            >
              Mark as processed
            </Button>
          ) : null}
          {roll.isComplete && roll.isProcessed ? (
            <Button
              variant="secondary"
              style={{ marginBottom: theme.spacing.s12 }}
              onPress={() => dispatch(toggleProcessed(roll.id))}
            >
              Mark as unprocessed
            </Button>
          ) : null}
          <List
            items={frameList}
            keyExtractor={(i) => i.id}
            dividerColor={!roll.isComplete ? "light" : "dark"}
            renderItem={(item) => {
              const shutterSpeedStr = formatShutterSpeed(item.shutterSpeed);
              const apertureStr = formatAperture(item.aperture);
              const focalLengthStr = formatFocalLength(item.focalLength);
              return (
                <ListItem
                  title={`Photo ${item.frameNumber}`}
                  subtitle={`${shutterSpeedStr}  •  ${apertureStr}  •  ${focalLengthStr}${
                    item.notes ? `\n${item.notes}` : ""
                  }`}
                  onPress={() =>
                    navigation.navigate("EditFrame", {
                      rollId,
                      frameId: item.id,
                    })
                  }
                  isHighlighted={!roll.isComplete}
                />
              );
            }}
          />
          {roll.frames.length > 0 && !roll.isComplete ? (
            <Button
              variant="secondary"
              style={{ marginTop: theme.spacing.s12 }}
              onPress={() => dispatch(toggleComplete(roll.id))}
            >
              Finish roll{roll.hasFramesLeft ? " early" : ""}
            </Button>
          ) : null}
          {roll.isComplete && roll.hasFramesLeft ? (
            <Button
              variant="secondary"
              style={{ marginTop: theme.spacing.s12 }}
              onPress={() => dispatch(resumeShooting(roll.id))}
            >
              Resume shooting
            </Button>
          ) : null}
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>Dates</SectionTitle>
          <List
            items={dateInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <ListItem
                leftIconType={item.icon ? item.icon : undefined}
                title={item.label}
              />
            )}
          />
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>Film</SectionTitle>
          <List
            items={filmMetaInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <ListItem
                leftIconType={item.icon ? item.icon : undefined}
                title={item.label}
              />
            )}
          />
        </ContentBlock>
        <ScrollViewPadding />
      </ScrollView>
    </ScreenBackground>
  );
}
