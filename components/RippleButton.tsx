import {
  ColorValue,
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { View, ViewProps } from "./Themed";

export type RippleButtonProps = {
  /** The color of the ripple effect */
  rippleColor?: ColorValue;
  /** Whether the effect will spread outside the container */
  borderless?: boolean;
  /** Callback to be called when card is pressed */
  onPress?: (event:GestureResponderEvent) => void
} & ViewProps;

/** Polymorphic button component that will render a
 * button with ripple effect for android, and TouchableOpacity for iOS
 */
const RippleButton = ({
  rippleColor = "#6200EE33",
  borderless = false,
  accessibilityLabel = "Ripple Button",
  onPress,
  children,
  ...otherProps
}: RippleButtonProps) => {
  if (Platform.OS === "android") {
    return (
      <View {...otherProps}>
      <TouchableNativeFeedback
        accessibilityLabel={accessibilityLabel}
        background={TouchableNativeFeedback.Ripple(rippleColor, borderless)}
        style={{backgroundColor:"transparent"}}
        onPress={onPress}
        useForeground
        {...otherProps}
      >
        {children}
      </TouchableNativeFeedback>
      </View>
    );
  }

  return (
    <View {...otherProps}>
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
      onPress={onPress}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
    </View>
  );
};

export default React.memo(RippleButton);
