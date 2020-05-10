import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
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
import { Subhead } from "../design-system/Subhead";
import { format } from "date-fns";
import { RollsScreenStackParamList } from "./RollsScreen";
import { RootStackParamList } from "../App";

export type RollsScreenRouteProp = RouteProp<
  RollsScreenStackParamList,
  "RollsList"
>;
export type RollsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Rolls">,
  StackNavigationProp<RollsScreenStackParamList, "RollsList">
>;

type Props = {
  route: RollsScreenRouteProp;
  navigation: RollsScreenNavigationProp;
};

export function RollsListScreen({ navigation }: Props) {
  const { shooting, complete, processed } = useSelector(
    rollSelectors.rollsListGrouped,
  );

  return (
    <ScreenBackground>
      <ScrollView>
        {/* <ContentBlock>
          <Button onPress={() => navigation.navigate("CameraBag")}>
            Camera bag
          </Button>
        </ContentBlock> */}
        <ContentBlock>
          <SectionTitle>Shooting</SectionTitle>
          <List
            style={{ marginBottom: theme.spacing.s12 }}
            items={shooting}
            keyExtractor={(i) => i.id}
            dividerColor="light"
            renderItem={(item) => (
              <ListItem
                pretitle={
                  <Subhead color="invertedSubtle">
                    <Subhead color="inverted">{item.framesTaken}</Subhead> /{" "}
                    {item.maxFrameCount}
                  </Subhead>
                }
                title={item.filmStockName}
                subtitle={item.cameraName}
                isHighlighted={true}
                onPress={() =>
                  navigation.navigate("RollDetail", { rollId: item.id })
                }
              />
            )}
          />
          <Button
            variant="secondary"
            onPress={() => {
              navigation.navigate("AddRollModal");
            }}
          >
            Start a new roll
          </Button>
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
    </ScreenBackground>
  );
}
