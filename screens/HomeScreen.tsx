import * as React from "react";
import { ScrollView } from "react-native";
import NetworkCard from "../components/NetworkCard";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";

//Network Logos
const mtnLogo = require("../assets/images/mtn_icon.png"),
  airtelLogo = require("../assets/images/airtel_icon.png"),
  gloLogo = require("../assets/images/glo_icon.png"),
  etisalatLogo = require("../assets/images/9mobile_icon.png");

function HomeScreen({ navigation }: RootTabScreenProps<"Top-Up">) {
  const handleSelectNetwork = React.useCallback((networkName: string) => {
    navigation.navigate("Settings", { networkName });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 16 }}
    >
      <Text type="overline" style={{ textAlign: "center", marginTop: 24 }}>
        Welcome
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 24 }} type="title">
        Select network for top up
      </Text>

      <NetworkCard
        logoColor="#FFC423"
        logoSrc={mtnLogo}
        networkName="Mtn Nigeria"
        onPress={() => handleSelectNetwork("mtn")}
      />

      <NetworkCard
        logoColor="#F80018"
        logoSrc={airtelLogo}
        networkName="Airtel Nigeria"
        onPress={() => handleSelectNetwork("airtel")}
      />

      <NetworkCard
        logoColor="#03BE39"
        logoSrc={gloLogo}
        networkName="Glo Nigeria"
        onPress={() => handleSelectNetwork("glo")}
      />
      <NetworkCard
        logoColor="#7BAA31"
        logoSrc={etisalatLogo}
        networkName="9Mobile"
        onPress={() => handleSelectNetwork("etisalat")}
      />
    </ScrollView>
  );
}

export default React.memo(HomeScreen);
