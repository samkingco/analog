import React from "react";
import { ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraBagStackParamList } from "./CameraBagScreen";
import { SafeAreaView } from "../design-system/SafeAreaView";
import { Headline } from "../design-system/Headline";

type AboutScreenRouteProp = RouteProp<CameraBagStackParamList, "About">;
type AboutScreenNavigationProp = StackNavigationProp<
  CameraBagStackParamList,
  "About"
>;

type Props = {
  route: AboutScreenRouteProp;
  navigation: AboutScreenNavigationProp;
};

export function AboutScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Headline>The about screen goes here</Headline>
      </ScrollView>
    </SafeAreaView>
  );
}
