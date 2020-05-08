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

interface HorizontalScrollPickerProps<T> {
  style?: StyleProp<ViewStyle>;
  label?: string;
  items: T[];
  renderDisplayValue: (item: T, index: number) => string;
  keyExtractor: (item: T, index: number) => string | number;
  onSelect: (item: T) => void;
}

interface ItemLayoutMap {
  [key: string]: {
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export function HorizontalScrollPicker<T>(
  props: HorizontalScrollPickerProps<T>,
) {
  const wrapperRef = useRef<View>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const animatedScrollX = new Animated.Value(0);
  const [scrollViewOuterWidth, setScrollViewOuterWidth] = useState(0);

  const [itemLayoutMap, setItemLayoutMap] = useState<ItemLayoutMap>({});
  const [lastItemPosition, setLastItemPosition] = useState({ x: 0, width: 0 });
  const totalItemsWidth = lastItemPosition.x + lastItemPosition.width;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const isPausing = useRef(false);

  // Pass the selected item back up to the parent
  useEffect(() => {
    props.onSelect(props.items[selectedIndex]);
  }, [selectedIndex]);

  // Update the item layouts when items change
  useEffect(() => {
    setLastItemPosition(getLastItemPosition());
  }, [itemLayoutMap, props.items]);

  function itemLayoutsSortedByIndex() {
    return Object.keys(itemLayoutMap)
      .map((key) => itemLayoutMap[key])
      .sort((a, b) => (a.index > b.index ? 1 : -1));
  }

  function getLastItemPosition() {
    const itemLayouts = itemLayoutsSortedByIndex();
    if (itemLayouts.length < props.items.length) {
      return { x: 0, width: 0 };
    }
    const lastItem = itemLayouts[itemLayouts.length - 1];
    return { x: lastItem.x, width: lastItem.width };
  }

  function getSelectedItem() {
    const itemLayouts = itemLayoutsSortedByIndex();
    if (itemLayouts.length <= 0) {
      return undefined;
    }
    const scrollOffset = (animatedScrollX as any)._value;
    const closestItemToEdge = itemLayouts.reduce(function (prev, curr) {
      return Math.abs(curr.x - scrollOffset) < Math.abs(prev.x - scrollOffset)
        ? curr
        : prev;
    });
    return closestItemToEdge;
  }

  function onScrollStop() {
    // Pause
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
        onLayout={(event) => {
          setScrollViewOuterWidth(event.nativeEvent.layout.width);
        }}
        onScroll={(event) => {
          animatedScrollX.setValue(event.nativeEvent.contentOffset.x);
        }}
        onScrollEndDrag={onScrollStop}
        onMomentumScrollBegin={cancelPausing}
        onMomentumScrollEnd={onScrollStop}
        scrollEventThrottle={16}
        horizontal={true}
        scrollToOverflowEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        contentContainerStyle={{
          // Add extra space to the end of the ScrollView so you can get
          // to the last item
          paddingRight:
            scrollViewOuterWidth - lastItemPosition.width - theme.spacing.s12,
        }}>
        {props.items.map((item, index) => {
          const key = props.keyExtractor(item, index);
          const layout = itemLayoutMap[key];
          const content = props.renderDisplayValue(item, index);

          if (!content) {
            return null;
          }

          let startOffset = 0;
          let endOffset = 0;

          if (layout) {
            startOffset = layout.x;
            endOffset = layout.x + layout.width;
          }

          const opacityBase = 0.4;
          const opacityTrail = 25;
          let opacityInterpolation;
          if (layout && totalItemsWidth) {
            opacityInterpolation = animatedScrollX.interpolate({
              inputRange: [
                opacityTrail * -2,
                startOffset - opacityTrail,
                startOffset,
                endOffset,
                endOffset + opacityTrail,
                totalItemsWidth + opacityTrail * 2,
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
                const newItemLayoutMap = {
                  ...itemLayoutMap,
                  [key]: { index, ...event.nativeEvent.layout },
                };
                setItemLayoutMap(newItemLayoutMap);
              }}
              style={[
                styles.item,
                {
                  opacity: opacityInterpolation || opacityBase,
                },
              ]}>
              <Headline>{content}</Headline>
            </Animated.View>
          );
        })}
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
