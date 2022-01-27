import * as React from "react";
import { View, Text } from "../components/Themed";
import { Animated, Image, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import RippleButton, { RippleButtonProps } from "./RippleButton";
import appStyles from "../lib/appStyles";

/** Type for network UI card */
type NetworkCardType = {
  /** Name of the network */
  networkName: string;
  /** Resource id of the logo image */
  logoSrc: ImageSourcePropType;
  /** The primary color of the network logo.
   * (it will be used to create a gradient that'll fade to white, for the card)
   */
  logoColor: string;
} & RippleButtonProps;

const whiteColor = tw.color("on-primary") as string;

/** Displays UI Card represnting network for top-up */
const NetworkCard = ({
  networkName,
  logoSrc,
  logoColor = whiteColor,
  accessibilityLabel = "Network UI Card Component",
  ...otherProps
}: NetworkCardType) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          useNativeDriver: true,
          toValue: 1.02,
          duration: 500,
          delay: [50, 350, 800, 750, 500, 1000][Math.floor(Math.random() * 5)],
        }),
        Animated.timing(scaleAnim, {
          useNativeDriver: true,
          toValue: 1,
          duration: 500,
          delay: 0,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <RippleButton
        accessibilityLabel={accessibilityLabel}
        style={[tw`my-4 rounded-xl`, appStyles.boxShadow]}
        {...otherProps}
      >
        <LinearGradient
          colors={[logoColor, whiteColor, logoColor]}
          start={{ x: 0.4, y: 0.4 }}
          end={{ x: 1, y: 1 }}
          style={tw.style(`p-9 flex-row justify-between rounded-xl`)}
          accessibilityLabel="linear gradient wrapper"
        >
          <Image
            source={logoSrc}
            style={tw`w-14 h-14`}
            accessibilityLabel="network image"
          />
          <View
            style={tw`flex-row justify-between bg-transparent items-center`}
          >
            <Text
              accessibilityLabel="network name label"
              type="button"
              style={tw`mr-5 text-on-surface`}
            >
              {networkName}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={tw.color("on-surface")}
            />
          </View>
        </LinearGradient>
      </RippleButton>
    </Animated.View>
  );
};

export default React.memo(NetworkCard);
