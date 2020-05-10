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
import { RollsScreenStackParamList } from "./RollsStack";
import { RootStackParamList } from "../App";

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

  return (
    <ScreenBackground>
      <ScrollView>
        <ContentBlock>
          <SectionTitle>Shooting</SectionTitle>
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
          <Button
            variant="secondary"
            onPress={() => {
              navigation.navigate("AddRollStack");
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
