import React, { useState } from "react";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { useSelector, useDispatch } from "react-redux";
import { ContentBlock } from "../design-system/ContentBlock";
import { theme } from "../theme";
import { List } from "../design-system/List";
import { filmStockSelectors } from "../store/film-stocks";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "../design-system/TextInput";
import { updateTempRoll } from "../store/rolls";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { ListItem } from "../design-system/ListItem";
import { AddRollStackParamList } from "./AddRollStack";

type AddRollChooseFilmStockScreenRouteProp = RouteProp<
  AddRollStackParamList,
  "AddRollChooseFilmStock"
>;
type AddRollChooseFilmStockNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "RollsStack">,
  StackNavigationProp<AddRollStackParamList, "AddRollChooseFilmStock">
>;

type AddRollChooseFilmStockScreenProps = {
  route: AddRollChooseFilmStockScreenRouteProp;
  navigation: AddRollChooseFilmStockNavigationProp;
};

export function AddRollChooseFilmStockScreen({
  navigation,
}: AddRollChooseFilmStockScreenProps) {
  const dispatch = useDispatch();
  const filmStocks = useSelector(filmStockSelectors.filmStocksList);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = filmStocks.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ContentBlock>
          <TextInput
            placeholder="Filter"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </ContentBlock>
        <ContentBlock style={{ flex: 1, paddingBottom: 0 }}>
          <ScrollView style={{ borderRadius: theme.misc.borderRadius }}>
            <List
              items={filteredList}
              keyExtractor={(i) => i.id}
              renderItem={(item) => (
                <ListItem
                  title={item.name}
                  subtitle={`ISO ${item.speed} ${
                    item.type ? `  •  ${item.type}` : null
                  }`}
                  onPress={() => {
                    dispatch(updateTempRoll({ filmStockId: item.id }));
                    navigation.navigate("AddRollChooseCamera");
                  }}
                />
              )}
            />
            <ScrollViewPadding />
          </ScrollView>
        </ContentBlock>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
