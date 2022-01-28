import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import FavoriteNetworkDialog, {
  FavoriteNetworkOptions,
} from "../components/FavoriteNetworkDialog";
import RippleButton from "../components/RippleButton";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import tw from "../lib/tailwind";
import {
  initialState,
  setFavoriteNetwork,
  setPrefixCode,
} from "../store/slices/settingsSlice";
import { NetworkName, RootState, RootTabScreenProps } from "../types";
import debounce from "../utils/debouncer";

function SettingsScreen({
  navigation,
}: RootTabScreenProps<"Settings">): JSX.Element {
  const dispatch = useDispatch();

  //prefix codes from the store
  const prefixCodes = useSelector(
    (state: RootState) => state.settings.prefixCodes
  );

  //favorite network selector
  const favoriteNetwork = useSelector(
    (state: RootState) => state.settings.favoriteNetwork
  );

  //state for prefix codes entered by the user
  const [prefixCodesInput, setPrefixCodesInput] = React.useState({
    mtn: prefixCodes.mtn,
    airtel: prefixCodes.airtel,
    glo: prefixCodes.glo,
    etisalat: prefixCodes.etisalat,
  });

  // visibility state for favorite network dialog
  const [favNetDialogVisible, setFavNetDialogVisible] = React.useState(false);

  /*
   * This effect automatically updates prefix codes in the store whenever a change is made to the
   * prefixes state tracked internally in this component.
   * But we dont want to dispatch on first render, thus the `firstRender` ref.
   */
  const firstRender = React.useRef(true);
  React.useEffect(() => {
    if (!firstRender.current) debouncedDispatch();
    firstRender.current = false;
  }, [prefixCodesInput]);

  const defaultPrefixesArray = React.useMemo(
    () => Object.values(initialState.prefixCodes),
    []
  );

  //keeps track of whether user has modified any of the prefixes
  const somePrefixHasChanged: boolean =
    Object.values(prefixCodesInput).join("") != defaultPrefixesArray.join("");

  const networNamesList = React.useRef(
    Object.keys(prefixCodesInput) as ["mtn", "airtel", "glo", "etisalat"]
  ).current;

  /**
   * This function updates the prefix codes in store, but does it in a debounced fashion
   * to avoid dispatching to store as user types prefix
   */
  const debouncedDispatch = debounce(() => {
    dispatch(setPrefixCode(prefixCodesInput));
  }, 1000);

  const handlePrefixChange = (networkName: NetworkName, newPrefix: string) => {
    setPrefixCodesInput({ ...prefixCodesInput, [networkName]: newPrefix });
  };

  const handleResetPrefixes = () => {
    dispatch(setPrefixCode(initialState.prefixCodes));
    setPrefixCodesInput(initialState.prefixCodes);
  };

  const handleSelectFavNetwork = React.useCallback(
    (network: FavoriteNetworkOptions) => {
      dispatch(setFavoriteNetwork(network));
      setFavNetDialogVisible(false);
    },
    []
  );

  const theme = useColorScheme();

  return (
    <ScrollView
      contentContainerStyle={tw`p-4`}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={tw`p-4 rounded-xl mt-4`}
        darkColor={"#111"}
        lightColor={tw.color("surface")}
        accessibilityLabel="favorite network setting pane"
      >
        <Text
          accessibilityLabel="favorite network setting title"
          type="subTitle"
          darkColor={tw.color("on-dark")}
        >
          Favorite Network
        </Text>
        <Text
          accessibilityLabel="pane setting description"
          style={tw`mt-1`}
          lightColor={tw.color("on-surface")}
          darkColor={tw.color("on-dark")}
          type="body2"
        >
          Choose a favorite network so you won't be asked to select network when
          topping up.
        </Text>

        <RippleButton
          accessibilityLabel="favorite network selector button"
          style={tw`w-full mt-4`}
          lightColor="transparent"
          darkColor="transparent"
          onPress={() => setFavNetDialogVisible(true)}
        >
          <View
            style={tw`flex-row justify-between p-2`}
            lightColor="transparent"
            darkColor="transparent"
          >
            <Text
              accessibilityLabel="select favorite network button label"
              lightColor={tw.color(`on-surface`)}
              darkColor={tw.color("secondary")}
            >
              {!favoriteNetwork
                ? "Select Favorite Network"
                : favoriteNetwork[0].toUpperCase() +
                  favoriteNetwork.slice(1) +
                  " Nigeria"}
            </Text>
            <Ionicons
              name={"chevron-down"}
              size={20}
              style={tw.style(
                theme === "light" ? `text-on-surface` : `text-secondary`
              )}
            />
          </View>
        </RippleButton>
        {favNetDialogVisible ? (
          <FavoriteNetworkDialog
            onSelect={handleSelectFavNetwork}
            defaultNetwork={favoriteNetwork}
            onDismiss={() => {
              setFavNetDialogVisible(false);
            }}
          />
        ) : null}
      </View>

      <View
        style={tw`p-4 rounded-xl mt-4`}
        accessibilityLabel="recharge prefix codes setting pane"
        darkColor={"#111"}
        lightColor={tw.color("surface")}
      >
        <Text
          accessibilityLabel="recharge prefix codes setting title"
          type="subTitle"
          darkColor={tw.color("on-dark")}
          lightColor={tw.color("on-surface")}
        >
          Recharge Prefix Codes
        </Text>
        <Text
          accessibilityLabel="pane setting description"
          style={tw`mt-1`}
          lightColor={tw.color("on-surface")}
          darkColor={tw.color("on-dark")}
          type="body2"
        >
          Add desired prefix codes for each network recharge pin E.g *888* for
          MTN bonus
        </Text>

        <View
          accessibilityLabel="prefix-codes wrapper"
          style={tw`mt-2 bg-transparent`}
        >
          {networNamesList.map((networkName) => {
            return (
              <View
                accessibilityLabel={`${networkName} prefix-code input wrapper`}
                style={tw`flex-row items-center justify-between mt-2 bg-transparent`}
                key={networkName}
              >
                <Text
                  style={tw`mr-4`}
                  lightColor={tw.color("on-surface")}
                  darkColor={tw.color("on-dark")}
                >
                  {networkName[0].toUpperCase() + networkName.slice(1)} Nigeria
                </Text>
                <TextInput
                  textAlign="left"
                  underlineColorAndroid={tw.color(
                    theme === "light" ? "primary" : "secondary"
                  )}
                  clearButtonMode="never"
                  keyboardType="phone-pad"
                  maxLength={20}
                  textContentType="telephoneNumber"
                  style={[
                    tw`p-2 flex-auto text-base`,
                    {
                      color:
                        theme === "light"
                          ? "rgba(0,0,0,0.6)"
                          : tw.color("on-dark"),
                    },
                  ]}
                  accessibilityLabel={`${networkName} prefix-code input box`}
                  textAlignVertical="center"
                  value={prefixCodesInput[networkName]}
                  onChangeText={(newText) => {
                    handlePrefixChange(networkName, newText);
                  }}
                />
              </View>
            );
          })}
        </View>

        <RippleButton
          accessibilityLabel="reset prefix codes button"
          style={[
            tw`mt-6 w-full`,
            { display: somePrefixHasChanged ? "flex" : "none" },
          ]}
          lightColor="transparent"
          onPress={handleResetPrefixes}
        >
          <View style={tw`p-2`}>
            <Text type="button" style={tw`text-secondary text-center`}>
              RESET PREFIX CODES
            </Text>
          </View>
        </RippleButton>
      </View>
    </ScrollView>
  );
}

export default React.memo(SettingsScreen);
