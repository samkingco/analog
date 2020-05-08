import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

interface FadeProps {
  children: React.ReactNode;
  isVisible: boolean;
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
}

export function Fade({
  children,
  isVisible,
  minOpacity = 0,
  maxOpacity = 1,
  duration = 500,
}: FadeProps) {
  const visibility = useRef(
    new Animated.Value(isVisible ? maxOpacity : minOpacity),
  ).current;

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: isVisible ? maxOpacity : minOpacity,
      duration,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        opacity: visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      }}>
      {children}
    </Animated.View>
  );
}
