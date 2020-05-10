import React from "react";
import { useSelector } from "react-redux";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { cameraBagSelectors } from "../store/camera-bag";
import { RootStackParamList } from "../App";
import { theme } from "../theme";
import { ScreenBackground } from "../components/ScreenBackground";
import { ContentBlock } from "../design-system/ContentBlock";
import { List } from "../design-system/List";
import { SectionTitle } from "../design-system/SectionTitle";
import { Button } from "../design-system/Button";
import { ListItem } from "../design-system/ListItem";
import { CameraBagStackParamList } from "./CameraBagStack";

type CameraBagListScreenRouteProp = RouteProp<
  CameraBagStackParamList,
  "CameraBag"
>;
type CameraBagNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<CameraBagStackParamList, "CameraBag">
>;

type CameraBagListScreenProps = {
  route: CameraBagListScreenRouteProp;
  navigation: CameraBagNavigationProp;
};

export function CameraBagScreen({ navigation }: CameraBagListScreenProps) {
  const cameras = useSelector(cameraBagSelectors.camerasList);
  const lenses = useSelector(cameraBagSelectors.lensesList);

  return (
    <ScreenBackground>
      <ContentBlock>
        <SectionTitle>Cameras</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={cameras}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <ListItem
              title={item.name}
              onPress={() =>
                navigation.navigate("EditCamera", { cameraId: item.id })
              }
            />
          )}
        />
        <Button
          variant="secondary"
          onPress={() => navigation.navigate("AddCamera")}
        >
          Add camera
        </Button>
      </ContentBlock>
      <ContentBlock>
        <SectionTitle>Lenses</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={lenses}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <ListItem
              title={item.name}
              onPress={() =>
                navigation.navigate("EditCameraLens", {
                  cameraLensId: item.id,
                })
              }
            />
          )}
        />
        <Button
          variant="secondary"
          onPress={() =>
            navigation.navigate("AddCameraLens", { cameraId: undefined })
          }
        >
          Add lens
        </Button>
      </ContentBlock>
    </ScreenBackground>
  );
}
