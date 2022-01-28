import { View, Text } from "./Themed";
import * as React from "react";
import { NetworkName } from "../types";
import { Modal, ModalProps } from "react-native";
import tw from "../lib/tailwind";
import RippleButton from "./RippleButton";
import RadioButton from "./RadioButton";
import useColorScheme from "../hooks/useColorScheme";

export type FavoriteNetworkDialogTypes = {
  /** name of default favorite network or `'none'` */
  defaultNetwork: FavoriteNetworkOptions;
  /**
   * Callback to be called when a favorite network is selected from the dialog.
   * Callback will be called with a string of type `NetworkName` indicating the selected network,
   * or `"none"` for no default
   */
  onSelect: (selctedNetwork: FavoriteNetworkOptions) => void;
} & ModalProps;

export type FavoriteNetworkOptions = NetworkName | null;

const networkNames: FavoriteNetworkOptions[] = [
  null,
  "mtn",
  "airtel",
  "glo",
  "etisalat",
];

/**
 * A dialog component for selecting favorite network, although it can be used for another purpose
 * because its written in a decoupled manner.
 */
const FavoriteNetworkDialog = ({
  onSelect,
  defaultNetwork = null,
  style,
  onDismiss,
  accessibilityLabel = "Favorite network dialog",
  ...otherProps
}: FavoriteNetworkDialogTypes) => {
  const theme = useColorScheme();
  return (
    <Modal
      accessibilityLabel={accessibilityLabel}
      transparent
      animationType="fade"
      statusBarTranslucent={false}
      style={[tw`flex-col justify-center h-full items-center my-auto`, style]}
      {...otherProps}
    >
      <View
        style={tw`h-full w-full`}
        lightColor="#0005"
        darkColor="#0008"
        /** Dismiss modal when the backgound is touched */
        onTouchStart={onDismiss}
        accessibilityLabel="modal outer background"
      >
        <View
          style={[tw`max-w-md m-auto p-4`, { minWidth: 300 }]}
          accessibilityLabel="modal main"
          onTouchStart={(e) => e.stopPropagation()}
          lightColor={tw.color("surface")}
        >
          <Text
            accessibilityLabel="modal title"
            style={tw`mb-6`}
            type="subTitle"
          >
            Choose Favorite Network
          </Text>
          {networkNames.map((networkName) => (
            <RippleButton
              lightColor="transparent"
              rippleColor={theme === "dark" ? "#CAFFF4" : undefined}
              onPress={() => onSelect(networkName)}
              accessibilityLabel={`${networkName} radio selector button`}
            >
              <View
                style={tw`flex-row justify-between p-4`}
                lightColor="transparent"
              >
                <Text
                  accessibilityLabel={`${networkName} slector button label`}
                  type="button"
                  lightColor={tw.color("on-surface")}
                  darkColor={tw.color("secondary")}
                >
                  {networkName ? networkName : "None"}{" "}
                  {networkName && "Nigeria"}
                </Text>
                <RadioButton
                  active={defaultNetwork == networkName}
                  onPress={() => onSelect(networkName)}
                />
              </View>
            </RippleButton>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(FavoriteNetworkDialog);
