import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, View } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { rollSelectors } from "../store/rolls";
import { ContentBlock } from "../design-system/ContentBlock";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { theme } from "../theme";
import { Button } from "../design-system/Button";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { ScreenBackground } from "../components/ScreenBackground";
import { ListItem } from "../design-system/ListItem";
import { format } from "date-fns";
import { RollsScreenStackParamList } from "./RollsStack";
import { RootStackParamList } from "../App";
import { cameraBagSelectors } from "../store/camera-bag";
import { Headline } from "../design-system/Headline";
import { EmptyScreenContent } from "../components/EmptyScreenContent";

export type RollsScreenRouteProp = RouteProp<
  RollsScreenStackParamList,
  "Rolls"
>;
export type RollsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<RollsScreenStackParamList, "Rolls">
>;

type Props = {
  route: RollsScreenRouteProp;
  navigation: RollsScreenNavigationProp;
};

export function RollsScreen({ navigation }: Props) {
  const { shooting, complete, processed } = useSelector(
    rollSelectors.rollsListGrouped,
  );

  const cameras = useSelector(cameraBagSelectors.camerasList);
  const hasCamera = cameras.length > 0;

  const hasRolls = Boolean(
    shooting.length > 0 || complete.length > 0 || processed.length > 0,
  );

  return (
    <ScreenBackground>
      {!hasCamera && !hasRolls ? (
        <EmptyScreenContent>
          <Headline
            style={{ marginBottom: theme.spacing.s12, textAlign: "center" }}
          >
            It looks like you don't have a camera set up. Add one to start
            shooting.
          </Headline>
          <Button
            variant="secondary"
            onPress={() => {
              navigation.navigate("AddCamera");
            }}
          >
            Add camera
          </Button>
        </EmptyScreenContent>
      ) : null}
      {hasCamera && !hasRolls ? (
        <EmptyScreenContent>
          <Headline
            style={{ marginBottom: theme.spacing.s12, textAlign: "center" }}
          >
            You're all set up! You can start shooting and tracking the film
            photos you take.
          </Headline>
          <Button
            variant="secondary"
            onPress={() => {
              navigation.navigate("AddRollStack");
            }}
          >
            Start a new roll
          </Button>
        </EmptyScreenContent>
      ) : null}
      {hasRolls ? (
        <ScrollView>
          {!hasCamera ? (
            <ContentBlock>
              <Headline style={{ marginBottom: theme.spacing.s12 }}>
                It looks like you don't have a camera set up. Add one to start
                shooting.
              </Headline>
              <Button
                variant="secondary"
                onPress={() => {
                  navigation.navigate("AddCamera");
                }}
              >
                Add camera
              </Button>
            </ContentBlock>
          ) : null}
          <ContentBlock>
            <SectionTitle>
              {shooting.length > 0
                ? "Shooting"
                : "Not shooting anything right now"}
            </SectionTitle>
            <List
              style={{ marginBottom: theme.spacing.s12 }}
              items={shooting}
              keyExtractor={(i) => i.id}
              dividerColor="light"
              renderItem={(item) => (
                <ListItem
                  title={item.filmStockName}
                  subtitle={`${item.cameraName}\n${
                    item.maxFrameCount - item.framesTaken
                  } photos left`}
                  isHighlighted={true}
                  onPress={() =>
                    navigation.navigate("RollDetail", { rollId: item.id })
                  }
                />
              )}
            />
            {hasCamera ? (
              <Button
                variant="secondary"
                onPress={() => {
                  navigation.navigate("AddRollStack");
                }}
              >
                Start a new roll
              </Button>
            ) : null}
          </ContentBlock>

          {complete.length > 0 ? (
            <ContentBlock>
              <SectionTitle>Unprocessed</SectionTitle>
              <List
                items={complete}
                keyExtractor={(i) => i.id}
                renderItem={(item) => (
                  <ListItem
                    pretitle={
                      item.dateCompleted
                        ? format(item.dateCompleted, "do MMMM")
                        : ""
                    }
                    title={item.filmStockName}
                    subtitle={item.cameraName}
                    onPress={() =>
                      navigation.navigate("RollDetail", { rollId: item.id })
                    }
                  />
                )}
              />
            </ContentBlock>
          ) : null}

          {processed.length > 0 ? (
            <ContentBlock>
              <SectionTitle>Processed</SectionTitle>
              <List
                items={processed}
                keyExtractor={(i) => i.id}
                renderItem={(item) => (
                  <ListItem
                    pretitle={
                      item.dateProcessed
                        ? format(item.dateProcessed, "do MMMM")
                        : ""
                    }
                    title={item.filmStockName}
                    subtitle={item.cameraName}
                    onPress={() =>
                      navigation.navigate("RollDetail", { rollId: item.id })
                    }
                  />
                )}
              />
            </ContentBlock>
          ) : null}
          <ScrollViewPadding />
        </ScrollView>
      ) : null}
    </ScreenBackground>
  );
}
