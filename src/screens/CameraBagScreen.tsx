import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { cameraBagSelectors } from "../store/camera-bag";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { theme } from "../theme";
import { ContentBlock } from "../design-system/ContentBlock";
import { List } from "../design-system/List";
import { SectionTitle } from "../design-system/SectionTitle";
import { Button } from "../design-system/Button";
import { ListItem } from "../design-system/ListItem";

type CameraBagScreenRouteProp = RouteProp<RootStackParamList, "CameraBag">;
type CameraBagNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CameraBag"
>;

type CameraBagScreenProps = {
  route: CameraBagScreenRouteProp;
  navigation: CameraBagNavigationProp;
};

export function CameraBagScreen({ navigation }: CameraBagScreenProps) {
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
            <ListItem title={item.name} onPress={() => {}} />
          )}
        />
        <Button variant="secondary">Add camera</Button>
      </ContentBlock>
      <ContentBlock>
        <SectionTitle>Lenses</SectionTitle>
        <List
          style={{ marginBottom: theme.spacing.s12 }}
          items={lenses}
          keyExtractor={(i) => i.id}
          renderItem={(item) => (
            <ListItem title={item.name} onPress={() => {}} />
          )}
        />
        <Button
          variant="secondary"
          onPress={() => navigation.navigate("AddLens")}
        >
          Add lens
        </Button>
      </ContentBlock>
    </ScreenBackground>
  );
}
