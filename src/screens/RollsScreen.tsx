import React from "react";
import { useSelector } from "react-redux";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import { RootStackParamList } from "../App";
import { rollSelectors, ComputedRoll } from "../store/rolls";
import { SafeAreaView } from "../components/SafeAreaView";
import { Headline } from "../design-system/Headline";
import { ContentBlock } from "../design-system/ContentBlock";
import { SectionTitle } from "../design-system/SectionTitle";
import { List } from "../design-system/List";
import { theme } from "../theme";
import { Subhead } from "../design-system/Subhead";
import { ChevronRightIcon } from "../design-system/icons/ChevronRightIcon";
import { Icon } from "../design-system/Icon";
import { Button } from "../design-system/Button";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { ScreenBackground } from "../components/ScreenBackground";

type RollsScreenRouteProp = RouteProp<RootStackParamList, "Rolls">;
type RollsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Rolls"
>;

type Props = {
  route: RollsScreenRouteProp;
  navigation: RollsScreenNavigationProp;
};

interface RollListItemProps {
  type: "shooting" | "complete" | "processed";
  item: ComputedRoll;
  navigation: RollsScreenNavigationProp;
  isHighlighted?: boolean;
}

function RollListItem({
  type,
  item,
  navigation,
  isHighlighted,
}: RollListItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={isHighlighted ? 0.8 : 0.4}
      style={[
        styles.listItemBase,
        isHighlighted ? styles.listItemHighlighted : styles.listItemDefault,
      ]}
      onPress={() => navigation.navigate("RollDetail", { rollId: item.id })}>
      <View style={styles.listItemContent}>
        {type === "shooting" && (
          <Subhead>
            <Subhead color={isHighlighted ? "inverted" : undefined}>
              {item.framesTaken}
            </Subhead>{" "}
            / {item.maxFrameCount}
          </Subhead>
        )}
        {type === "complete" && item.dateCompleted && (
          <Subhead color="subtle">
            {format(item.dateCompleted, "do MMMM")}
          </Subhead>
        )}
        {type === "processed" && item.dateProcessed && (
          <Subhead color="subtle">
            {format(item.dateProcessed, "do MMMM")}
          </Subhead>
        )}
        <Headline color={isHighlighted ? "inverted" : undefined}>
          {item.filmStockName}
        </Headline>
        <Subhead>{item.cameraName}</Subhead>
      </View>
      <View>
        <Icon type={ChevronRightIcon} color="subtle" />
      </View>
    </TouchableOpacity>
  );
}

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
              <RollListItem
                type="shooting"
                item={item}
                navigation={navigation}
                isHighlighted={true}
              />
            )}
          />
          <Button
            variant="secondary"
            onPress={() => {
              navigation.navigate("AddRollChooseFilmStock");
            }}>
            Start a new roll
          </Button>
        </ContentBlock>

        {complete.length > 0 ? (
          <ContentBlock>
            <SectionTitle>Complete</SectionTitle>
            <List
              items={complete}
              keyExtractor={(i) => i.id}
              renderItem={(item) => (
                <RollListItem
                  type="complete"
                  item={item}
                  navigation={navigation}
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
                <RollListItem
                  type="processed"
                  item={item}
                  navigation={navigation}
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
