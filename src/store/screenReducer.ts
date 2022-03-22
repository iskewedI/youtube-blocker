import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Screens } from '../types/enums';
import { AppDispatch, RootState } from './configureStore';

const initialState = {
  currentScreen: Screens.Profiles,
};

const slice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    screenChanged: (store, action) => {
      store.currentScreen = action.payload.screen;
    },
  },
});

const { screenChanged } = slice.actions;

export default slice.reducer;

// Action creators
export const changeScreen =
  (screen: Screens) => (dispatch: AppDispatch, getState: any) => {
    const { currentScreen } = getState().screen;

    if (currentScreen === screen) return;

    dispatch({
      type: screenChanged.type,
      payload: {
        screen,
      },
    });
  };

// Selectors
export const getCurrentScreen = createSelector(
  (state: RootState) => state.screen,
  screen => screen.currentScreen
);
