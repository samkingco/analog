import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
  TextInputProps,
} from "react-native";
import { theme } from "../theme";
import { Subhead } from "./Subhead";

interface Props {
  style?: StyleProp<ViewStyle>;
  value: string;
  label?: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  inputProps?: TextInputProps;
}

function getInputStyles(isFocused: boolean) {
  const result: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.background.interactive,
    borderColor: theme.colors.background.interactive,
  };

  if (isFocused) {
    result.backgroundColor = theme.colors.background.interactive;
    result.borderColor = "rgba(255,255,255,0.2)";
  }

  return result;
}

export const TextInput = (props: Props) => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }

  function onFocus() {
    setFocused(true);
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur();
    }

    setFocused(false);
  }

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View
        style={[props.style, styles.inputWrapper, getInputStyles(isFocused)]}>
        <View style={styles.inputContent}>
          {props.label ? (
            <Subhead
              style={{
                lineHeight: theme.fontSizes.m,
                marginBottom: theme.spacing.s4 - 1,
              }}>
              {props.label}
            </Subhead>
          ) : null}
          <RNTextInput
            ref={inputRef}
            value={props.value}
            onFocus={onFocus}
            placeholder={props.placeholder}
            onBlur={onBlur}
            style={styles.input}
            placeholderTextColor={theme.colors.text.subtle}
            onChangeText={props.onChange}
            multiline={false}
            returnKeyType={
              props.inputProps &&
              (props.inputProps.keyboardType === "number-pad" ||
                props.inputProps.keyboardType === "numeric")
                ? "done"
                : "default"
            }
            {...(props.inputProps || {})}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 2,
    borderRadius: theme.misc.borderRadius,
    paddingVertical: theme.spacing.s12 - 2,
    paddingHorizontal: theme.spacing.s12 - 2,
    backgroundColor: theme.colors.background.interactive,
  },
  input: {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: theme.fonts.normal,
    fontSize: theme.fontSizes.m,
    lineHeight: theme.fontSizes.m * 1.3,
    color: theme.colors.text.default,
  },
  inputContent: {
    flexGrow: 1,
  },
});
