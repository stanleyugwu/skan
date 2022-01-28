/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  "Top-Up": undefined;
  Settings: {
    networkName:string
  };
};

export type NetworkName = "mtn" | "airtel" | "glo" | "etisalat";

export type SettingsSlice = {
  favoriteNetwork: NetworkName | null,
  prefixCodes: {
    mtn: string;
    airtel: string;
    glo: string;
    etisalat: string;
  }
}

export type SetPrefixPayload = Record<NetworkName, string>;

export type RootState = {
  settings: SettingsSlice
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
