import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultT, UserData } from "../modules/modelTypes";
import { dummyResults } from "../data/dummyResults";

interface UiState {
  menuIsVisible: boolean;
  logged: boolean;
  userData: UserData;
  allPlayerData?: {
    results: ResultT[];
  };
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuIsVisible: false,
    logged: false,
    userData: {
      login: "",
      uId: null,
      money: 0,
      result: { wins: 0, draws: 0, loses: 0 },
      goals: { goalsFor: 0, goalsAgainst: 0 },
    },
    allPlayersData: {
      results: dummyResults,
    },
  } as UiState,

  reducers: {
    login(
      state,
      action: PayloadAction<{ logged: boolean; userData: UserData }>
    ) {
      state.logged = action.payload.logged;
      // state.uId = action.payload.uId;
      state.userData = action.payload.userData;
    },
    logout(state) {
      state.logged = false;
      // state.uId = null;
      state.userData = {
        login: "",
        uId: null,
        money: 0,
        result: { wins: 0, draws: 0, loses: 0 },
        goals: { goalsFor: 0, goalsAgainst: 0 },
      };
    },
    toggle(state) {
      state.menuIsVisible = !state.menuIsVisible;
    },
    hideMenu(state) {
      state.menuIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
