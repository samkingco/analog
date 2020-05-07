import React from "react";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from "react-native";

interface Props extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export function KeyboardAvoidingView(props: Props) {
  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={144}
      {...props}
    />
  );
}
