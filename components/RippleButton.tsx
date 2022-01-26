import {
  ColorValue,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import * as React from "react";

export type RippleButtonProps = {
  /** The color of the ripple effect */
  rippleColor?: ColorValue;
  /** Whether the effect will spread outside the container */
  borderless?: boolean;
} & (TouchableNativeFeedbackProps | TouchableOpacityProps);

/** Polymorphic button component that will render a
 * button with ripple effect for android, and TouchableOpacity for iOS
 */
const RippleButton = ({
  rippleColor = "#6200EE33",
  borderless = false,
  accessibilityLabel = "Ripple Button",
  children,
  ...otherProps
}: RippleButtonProps) => {
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback
        accessibilityLabel={accessibilityLabel}
        background={TouchableNativeFeedback.Ripple(rippleColor, borderless)}
        useForeground
        {...otherProps}
      >
        {children}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
};

export default React.memo(RippleButton);
