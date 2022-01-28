import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetworkName, SetPrefixPayload, SettingsSlice } from "../../types";

export const initialState:SettingsSlice = {
  favoriteNetwork:null,
  prefixCodes:{
    mtn: "*555*",
    airtel:"*126*",
    glo:"*123*",
    etisalat:"*222*"
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setFavoriteNetwork(state, action:PayloadAction<NetworkName | null>):void{
      state.favoriteNetwork = action.payload;
    },
    setPrefixCode(state, action:PayloadAction<SetPrefixPayload>):void{
      state.prefixCodes = {
        ...state.prefixCodes,
        ...action.payload,
      }
    }
  },
});

export const {setFavoriteNetwork, setPrefixCode} = settingsSlice.actions;

export default settingsSlice.reducer;
