import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { cameraBagSelectors, deleteCamera } from "../store/camera-bag";
import { ScreenBackground } from "../components/ScreenBackground";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { ContentBlock } from "../design-system/ContentBlock";
import { Subhead } from "../design-system/Subhead";
import { Button } from "../design-system/Button";
import { CameraBagStackParamList } from "./CameraBagStack";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { theme } from "../theme";
import { rollSelectors } from "../store/rolls";

export type CameraDetailScreenRouteProp = RouteProp<
  CameraBagStackParamList,
  "CameraDetail"
>;
export type CameraDetailScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<CameraBagStackParamList, "CameraDetail">
>;

type Props = {
  route: CameraDetailScreenRouteProp;
  navigation: CameraDetailScreenNavigationProp;
};

export function CameraDetailScreen({ route, navigation }: Props) {
  const dispatch = useDispatch();
  const { cameraId } = route.params;
  const camera = useSelector((s) => cameraBagSelectors.cameraById(s, cameraId));
  const cameraLenses = useSelector((s) =>
    cameraBagSelectors.lensesForCamera(s, cameraId),
  );
  const rollsList = useSelector((s) =>
    rollSelectors.rollsListForCameraGrouped(s, cameraId),
  );

  if (!camera) {
    return (
      <ScreenBackground>
        <Subhead>No camera found</Subhead>
      </ScreenBackground>
    );
  }

  navigation.setOptions({ title: camera.name });

  return (
    <ScreenBackground>
      <ScrollView style={{ flex: 1 }}>
        <ContentBlock>
          <Button
            variant="secondary"
            onPress={() => navigation.navigate("EditCamera", { cameraId })}
          >
            Edit camera
          </Button>
        </ContentBlock>
        <ContentBlock>
          <SectionTitle>
            {cameraLenses.length > 0 ? "Lenses" : "No lenses"}
          </SectionTitle>
          <List
            items={cameraLenses}
            keyExtractor={(i) => i.id}
            renderItem={(item) => (
              <ListItem
                title={item.name}
                onPress={() => {
                  navigation.navigate("EditCameraLens", {
                    cameraLensId: item.id,
                  });
                }}
              />
            )}
          />
          <Button
            variant="secondary"
            onPress={() => navigation.navigate("AddCameraLens", { cameraId })}
            style={{ marginTop: theme.spacing.s12 }}
          >
            Add lens
          </Button>
        </ContentBlock>
        {rollsList.shooting.length > 0 ? (
          <ContentBlock>
            <SectionTitle>Shooting</SectionTitle>
            <List
              style={{ marginBottom: theme.spacing.s12 }}
              items={rollsList.shooting}
              keyExtractor={(i) => i.id}
              dividerColor="light"
              renderItem={(item) => (
                <ListItem
                  title={item.filmStockName}
                  subtitle={`${item.cameraName}\n${
                    item.maxFrameCount - item.framesTaken
                  } photos left`}
                  isHighlighted={true}
                />
              )}
            />
          </ContentBlock>
        ) : null}
        <ContentBlock>
          <Button
            variant="danger"
            onPress={() => {
              dispatch(deleteCamera(camera.id));
              navigation.popToTop();
            }}
          >
            Delete camera
          </Button>
        </ContentBlock>
        <ScrollViewPadding />
      </ScrollView>
    </ScreenBackground>
  );
}
