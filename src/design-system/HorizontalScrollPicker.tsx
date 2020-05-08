import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { theme } from "../theme";
import { Subhead } from "./Subhead";
import { Headline } from "./Headline";
import { Fade } from "./Fade";

interface HorizontalScrollPickerProps<T> {
  style?: StyleProp<ViewStyle>;
  label?: string;
  items: T[];
  renderDisplayValue: (item: T, index: number) => string;
  keyExtractor: (item: T, index: number) => string | number;
  onSelect: (item: T) => void;
  initialIndex?: number;
}

interface ItemLayoutMap {
  [key: string]: {
    index: number;
    x: number;
    width: number;
  };
}

export function HorizontalScrollPicker<T>(
  props: HorizontalScrollPickerProps<T>,
) {
  const wrapperRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedScrollX = new Animated.Value(0);
  const [scrollViewOuterWidth, setScrollViewOuterWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isPausing = useRef(false);

  const lastItemKey = props.keyExtractor(
    props.items[props.items.length - 1],
    props.items.length - 1,
  );

  function makeInitialItemLayouts(
    items: HorizontalScrollPickerProps<T>["items"],
  ) {
    return items.reduce((map, item, index) => {
      const key = props.keyExtractor(item, index);
      return {
        ...map,
        [key]: {
          index,
          x: 0,
          width: 0,
        },
      };
    }, {});
  }

  const [itemLayouts, setItemLayouts] = useState<ItemLayoutMap>(
    makeInitialItemLayouts(props.items),
  );

  const lastItem = itemLayouts[lastItemKey];
  const totalItemWidths = lastItem ? lastItem.x + lastItem.width : 0;
  const lastItemWidth = lastItem ? lastItem.width : 0;

  const hasMeasuredAll = Object.keys(itemLayouts).every((key) => {
    const item = itemLayouts[key];
    return item.width > 0;
  });

  useEffect(() => {
    setItemLayouts(makeInitialItemLayouts(props.items));
    setSelectedIndex(0);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }, [props.items]);

  useEffect(() => {
    props.onSelect(props.items[selectedIndex]);
  }, [selectedIndex]);

  function getSelectedItem() {
    const scrollOffset = (animatedScrollX as any)._value;
    const closestItemToEdgeKey = Object.keys(itemLayouts).reduce(
      (prevKey, currKey) => {
        const prev = itemLayouts[prevKey];
        const curr = itemLayouts[currKey];
        return Math.abs(curr.x - scrollOffset) < Math.abs(prev.x - scrollOffset)
          ? currKey
          : prevKey;
      },
    );
    return itemLayouts[closestItemToEdgeKey];
  }

  function onScrollStop() {
    isPausing.current = true;

    setTimeout(() => {
      // If we're still paused after the timeout, set the selected item
      if (isPausing.current) {
        const selected = getSelectedItem();
        setSelectedIndex(selected ? selected.index : 0);

        // Reset the pause and "snap" to the selected items x position
        isPausing.current = false;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: selected ? selected.x : 0,
            y: 0,
            animated: true,
          });
        }
      }
    }, 150);
  }

  function cancelPausing() {
    isPausing.current = false;
  }

  return (
    <View style={[styles.wrapper, props.style]} ref={wrapperRef}>
      {props.label ? (
        <View style={styles.label}>
          <Subhead
            style={{
              lineHeight: theme.fontSizes.s,
            }}>
            {props.label}
          </Subhead>
        </View>
      ) : null}
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        scrollEnabled={hasMeasuredAll}
        scrollToOverflowEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        onLayout={(event) => {
          setScrollViewOuterWidth(event.nativeEvent.layout.width);
        }}
        onScroll={(event) => {
          // setActualScrollX(event.nativeEvent.contentOffset.x);
          animatedScrollX.setValue(event.nativeEvent.contentOffset.x);
        }}
        onScrollEndDrag={onScrollStop}
        onMomentumScrollBegin={cancelPausing}
        onMomentumScrollEnd={onScrollStop}
        scrollEventThrottle={16}
        contentContainerStyle={{
          // Add extra space to the end of the ScrollView so you can get
          // to the last item
          paddingRight:
            scrollViewOuterWidth - lastItemWidth - theme.spacing.s12,
        }}>
        {props.items.length > 0
          ? props.items.map((item, index) => {
              const key = props.keyExtractor(item, index);
              const content = props.renderDisplayValue(item, index);

              if (!content) {
                return null;
              }

              const layout = itemLayouts[key];

              let opacityInterpolation;
              const opacityTrail = 50;
              let opacityBase = 0.4;

              if (layout && hasMeasuredAll) {
                const startOffset = layout.x;
                const endOffset = layout.x + layout.width;

                opacityInterpolation = animatedScrollX.interpolate({
                  inputRange: [
                    opacityTrail * -2,
                    startOffset - opacityTrail,
                    startOffset,
                    endOffset,
                    endOffset + opacityTrail,
                    totalItemWidths + opacityTrail * 2,
                  ],
                  outputRange: [
                    opacityBase,
                    opacityBase,
                    1,
                    1,
                    opacityBase,
                    opacityBase,
                  ],
                });
              }

              return (
                <Animated.View
                  key={key}
                  onLayout={(event: LayoutChangeEvent) => {
                    const { x, width } = event.nativeEvent.layout;
                    setItemLayouts((state) => ({
                      ...state,
                      [key]: { index, x, width },
                    }));
                  }}
                  style={[
                    styles.item,
                    {
                      opacity: opacityInterpolation || opacityBase,
                    },
                  ]}>
                  <Fade isVisible={layout && hasMeasuredAll} minOpacity={0.2}>
                    <Headline>{content}</Headline>
                  </Fade>
                </Animated.View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: theme.misc.borderRadius,
    backgroundColor: theme.colors.background.interactive,
  },
  label: {
    paddingTop: theme.spacing.s12,
    paddingHorizontal: theme.spacing.s12,
  },
  item: {
    paddingTop: theme.spacing.s8 + 0.5,
    paddingBottom: theme.spacing.s12 + 2,
    paddingLeft: theme.spacing.s12,
    marginRight: theme.spacing.s12,
  },
});
