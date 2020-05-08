import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { theme } from "../theme";
import { Subhead } from "./Subhead";
import { Headline } from "./Headline";

interface HorizontalScrollPickerProps<T> {
  style?: StyleProp<ViewStyle>;
  label: string;
  items: T[];
  renderDisplayValue: (item: T, index: number) => string;
  keyExtractor: (item: T, index: number) => string | number;
  onSelect: (item: T) => void;
  initialIndex?: number;
}

const TICK_WIDTH = 2;
const TICK_HORZ_SPACE = theme.spacing.s4;
const TICK_TOTAL_WIDTH = TICK_WIDTH + TICK_HORZ_SPACE * 2;
const TICKS_PER_VALUE = 5;
const TICK_PAGE_SIZE = TICK_TOTAL_WIDTH * TICKS_PER_VALUE;

export function HorizontalScrollPicker<T>(
  props: HorizontalScrollPickerProps<T>,
) {
  const wrapperRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedScrollX = new Animated.Value(0);
  const [scrollViewOuterWidth, setScrollViewOuterWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(props.initialIndex || 0);

  const itemDisplayValues = props.items.map((item, index) =>
    props.renderDisplayValue(item, index),
  );

  const pagesPerView = Math.floor(scrollViewOuterWidth / TICK_PAGE_SIZE);
  const ticksForItems = props.items.length * TICKS_PER_VALUE + 1;
  const overflowTicks = (pagesPerView - 1) * TICKS_PER_VALUE;

  const ticks = Array.from(new Array(ticksForItems + overflowTicks)).map(
    (_, i) => i,
  );

  function scrollToIndex(index: number, animated = true) {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * TICK_PAGE_SIZE,
        y: 0,
        animated,
      });
    }
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    animatedScrollX.setValue(event.nativeEvent.contentOffset.x);
    const absIndex = Math.round(
      event.nativeEvent.contentOffset.x / TICK_PAGE_SIZE,
    );
    if (absIndex > props.items.length - 1 || absIndex < 0) {
      return;
    }
    setSelectedIndex(absIndex);
  }

  useEffect(() => {
    if (props.initialIndex) {
      scrollToIndex(props.initialIndex, false);
    }
  }, [props.initialIndex]);

  useEffect(() => {
    ReactNativeHapticFeedback.trigger("impactLight", {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    props.onSelect(props.items[selectedIndex]);
  }, [selectedIndex]);

  return (
    <View style={[styles.wrapper, props.style]} ref={wrapperRef}>
      <View style={styles.label}>
        <Subhead
          style={{
            lineHeight: theme.fontSizes.m,
          }}>
          {props.label}
        </Subhead>
      </View>
      <View style={styles.value}>
        <Headline
          style={{
            lineHeight: theme.fontSizes.m,
          }}>
          {itemDisplayValues[selectedIndex]}
        </Headline>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
        horizontal={true}
        onLayout={(event) => {
          if (props.initialIndex) {
            scrollToIndex(props.initialIndex, false);
          }
          setScrollViewOuterWidth(event.nativeEvent.layout.width);
        }}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={TICK_PAGE_SIZE}
        decelerationRate="fast"
        scrollEventThrottle={16}
        bounces={true}>
        {ticks.map((tick) => (
          <View
            style={[
              styles.tick,
              tick % TICKS_PER_VALUE !== 0 ? styles.tickSmall : undefined,
            ]}
            key={tick}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 64,
    borderRadius: theme.misc.borderRadius,
    backgroundColor: theme.colors.background.interactive,
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.misc.borderRadius,
  },
  scrollViewContentContainer: {
    paddingTop: 40,
    paddingHorizontal: theme.spacing.s12,
  },
  label: {
    paddingTop: theme.spacing.s12,
    paddingLeft: theme.spacing.s12,
  },
  value: {
    position: "absolute",
    top: theme.spacing.s12,
    right: theme.spacing.s12,
  },
  tick: {
    width: TICK_WIDTH,
    height: 12,
    backgroundColor: theme.colors.background.inverted,
    marginHorizontal: TICK_HORZ_SPACE,
    marginVertical: theme.spacing.s12,
    opacity: 0.4,
  },
  tickSmall: {
    height: 8,
    marginTop: theme.spacing.s12 + 4,
    opacity: 0.3,
  },
  item: {
    paddingTop: theme.spacing.s8 + 0.5,
    paddingBottom: theme.spacing.s12 + 2,
    paddingLeft: theme.spacing.s12,
    marginRight: theme.spacing.s12,
  },
});
