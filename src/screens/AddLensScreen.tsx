import React from "react";
import { ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { ScreenBackground } from "../components/ScreenBackground";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ContentBlock } from "../design-system/ContentBlock";
import { ScrollViewPadding } from "../components/ScrollViewPadding";
import { Headline } from "../design-system/Headline";

type AddLensScreenRouteProp = RouteProp<RootStackParamList, "AddLens">;
type AddLensScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddLens"
>;

type AddLensScreenProps = {
  route: AddLensScreenRouteProp;
  navigation: AddLensScreenNavigationProp;
};

export function AddLensScreen({ route, navigation }: AddLensScreenProps) {
  return (
    <ScreenBackground>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContentBlock>
            <Headline>Add lens dood</Headline>
          </ContentBlock>
          <ScrollViewPadding />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
