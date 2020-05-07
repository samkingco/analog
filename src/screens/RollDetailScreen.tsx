import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { RootStackParamList } from "../App";
import { rollSelectors, Frame } from "../store/rolls";
import { SafeAreaView } from "../design-system/SafeAreaView";
import { Headline } from "../design-system/Headline";
import { ContentBlock } from "../design-system/ContentBlock";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { theme } from "../theme";
import { Icon, IconComponent } from "../design-system/Icon";
import { filmStockSelectors } from "../store/film-stocks";
import { cameraBagSelectors } from "../store/camera-bag";
import { IsoIcon } from "../design-system/icons/IsoIcon";
import { ContrastIcon } from "../design-system/icons/ContrastIcon";
import { GrainIcon } from "../design-system/icons/GrainIcon";
import { CameraIcon } from "../design-system/icons/CameraIcon";
import { NoteIcon } from "../design-system/icons/NoteIcon";
import { Subhead } from "../design-system/Subhead";
import { ChevronRightIcon } from "../design-system/icons/ChevronRightIcon";
import { Button } from "../design-system/Button";

type RollDetailScreenRouteProp = RouteProp<RootStackParamList, "RollDetail">;
type RollDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RollDetail"
>;

type Props = {
  route: RollDetailScreenRouteProp;
  navigation: RollDetailScreenNavigationProp;
};

interface FrameListItem extends Frame {
  frameNumber: number;
  maxFrameCount: number;
}

interface FrameListItemProps {
  item: FrameListItem;
  navigation: RollDetailScreenNavigationProp;
}

function FrameListItem({ item, navigation }: FrameListItemProps) {
  const shutterSpeedStr = `${item.shutterWhole}${
    item.shutterFraction ? `/${item.shutterFraction}` : ""
  }s`;
  const apertureStr = `f/${item.aperture}`;
  const focalLengthStr = `${item.focalLength}mm`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.listItemBase, styles.listItemHighlighted]}
      onPress={() => navigation.navigate("FrameDetail", { frameId: item.id })}>
      <View style={styles.listItemContent}>
        <Subhead>
          <Subhead color="inverted">{item.frameNumber}</Subhead> /{" "}
          {item.maxFrameCount}
        </Subhead>
        {item.notes ? <Headline color="inverted">{item.notes}</Headline> : null}
        <Headline color="inverted">
          {shutterSpeedStr} • {apertureStr} • {focalLengthStr}
        </Headline>
        <Subhead>{format(item.captureTime, "HH:mm 'on' do MMMM")}</Subhead>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

interface InfoItem {
  icon?: IconComponent;
  label: string;
}

export function RollDetailScreen({ route, navigation }: Props) {
  const { rollId } = route.params;
  const roll = useSelector((s) => rollSelectors.rollById(s, rollId));
  const filmStock = useSelector((s) =>
    filmStockSelectors.filmStockById(s, roll ? roll.filmStockId : ""),
  );
  const camera = useSelector((s) =>
    cameraBagSelectors.cameraById(s, roll ? roll.cameraId : ""),
  );

  if (!roll) {
    return null;
  }

  navigation.setOptions({ title: roll.filmStockName });

  const frameList: FrameListItem[] = roll.framesOrder
    .map((id, index) => {
      return {
        ...roll.frames[id],
        frameNumber: index + 1,
        maxFrameCount: roll.maxFrameCount,
      };
    })
    .filter(Boolean)
    .reverse();

  const filmInfo: InfoItem[] = [];
  if (filmStock) {
    filmInfo.push({
      icon: IsoIcon,
      label: `ISO ${filmStock.speed}`,
    });
    if (filmStock.contrast) {
      filmInfo.push({
        icon: ContrastIcon,
        label: `${filmStock.contrast} contrast`,
      });
    }
    if (filmStock.grain) {
      filmInfo.push({
        icon: GrainIcon,
        label: `${filmStock.grain} grain`,
      });
    }
  }

  const extraInfo: InfoItem[] = [];
  if (camera) {
    extraInfo.push({
      icon: CameraIcon,
      label: camera.name,
    });
  }
  if (roll.notes) {
    extraInfo.push({
      icon: NoteIcon,
      label: roll.notes,
    });
  }

  const dateInfo: InfoItem[] = [];
  if (roll.dateLoaded) {
    dateInfo.push({
      label: `Loaded ${format(roll.dateLoaded, "do MMMM")}`,
    });
  }
  if (roll.dateCompleted) {
    dateInfo.push({
      label: `Completed ${format(roll.dateCompleted, "do MMMM")}`,
    });
  }
  if (roll.dateProcessed) {
    dateInfo.push({
      label: `Processed ${format(roll.dateProcessed, "do MMMM")}`,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {!roll.isComplete && frameList.length > 0 ? (
          <ContentBlock>
            <Button variant="secondary">New photo</Button>
          </ContentBlock>
        ) : null}
        <ContentBlock>
          {frameList.length > 0 ? (
            <>
              <SectionTitle>Photos taken</SectionTitle>
              <List
                items={frameList}
                keyExtractor={(i) => i.id}
                dividerColor="light"
                renderItem={(item) => (
                  <FrameListItem item={item} navigation={navigation} />
                )}
              />
              {!roll.isComplete ? (
                <Button
                  variant="secondary"
                  style={{ marginTop: theme.spacing.s12 }}>
                  Complete roll early
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <SectionTitle>No photos taken yet</SectionTitle>
              <Button variant="secondary">New photo</Button>
            </>
          )}
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>Info</SectionTitle>
          <List
            items={filmInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <View style={[styles.listItemBase, styles.listItemDefault]}>
                {item.icon ? (
                  <View style={{ marginRight: theme.spacing.s8 }}>
                    <Icon type={item.icon} color="subtle" />
                  </View>
                ) : null}
                <View style={styles.listItemContent}>
                  <Headline>{item.label}</Headline>
                </View>
              </View>
            )}
          />
          <List
            style={{ marginTop: theme.spacing.s12 }}
            items={extraInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <View style={[styles.listItemBase, styles.listItemDefault]}>
                {item.icon ? (
                  <View style={{ marginRight: theme.spacing.s8 }}>
                    <Icon type={item.icon} color="subtle" />
                  </View>
                ) : null}
                <View style={styles.listItemContent}>
                  <Headline>{item.label}</Headline>
                </View>
              </View>
            )}
          />
          <List
            style={{ marginTop: theme.spacing.s12 }}
            items={dateInfo}
            keyExtractor={(i) => i.label}
            renderItem={(item) => (
              <View style={[styles.listItemBase, styles.listItemDefault]}>
                {item.icon ? (
                  <View style={{ marginRight: theme.spacing.s8 }}>
                    <Icon type={item.icon} color="subtle" />
                  </View>
                ) : null}
                <View style={styles.listItemContent}>
                  <Headline>{item.label}</Headline>
                </View>
              </View>
            )}
          />
        </ContentBlock>
        <ContentBlock>
          <Button variant="secondary">Delete roll</Button>
        </ContentBlock>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItemBase: {
    padding: theme.spacing.s12,
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDefault: {
    backgroundColor: theme.colors.background.interactive,
  },
  listItemHighlighted: {
    backgroundColor: theme.colors.background.inverted,
  },
  listItemContent: {
    flex: 1,
  },
});
