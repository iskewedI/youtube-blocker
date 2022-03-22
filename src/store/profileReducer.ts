import { createSelector, createSlice } from '@reduxjs/toolkit';
import { formatTime } from '../service/utils';
import { TimeRange } from '../types/enums';
import { AppDispatch, RootState } from './configureStore';

const initialState: ProfilesInitialState = {
  isLoading: false,
  hasError: false,
  hasLoaded: false,
  selectedProfileId: '',
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    profilesRequested: store => {
      store.isLoading = true;
    },
    profilesReceived: (store, action) => {
      store.allIds = action.payload.allIds;
      store.byId = action.payload.byId;

      if (action.payload.allIds && action.payload.allIds.length > 0) {
        store.selectedProfileId = action.payload.allIds[0];
      }

      store.hasLoaded = true;
      store.isLoading = false;
      store.hasError = false;
    },
    profilesRequestFailed: store => {
      store.byId = {};
      store.allIds = [];

      store.hasLoaded = true;
      store.isLoading = false;
      store.hasError = true;
    },
    profileSelected: (store, action) => {
      store.selectedProfileId = action.payload.selectedProfileId;
    },
    profileModified: (store, action) => {
      const { id, data }: { id: string; data: Partial<Profile> } = action.payload;

      const profile = store.byId[id];

      if (!profile) return console.error('Could not find the profile with id => ', id);

      const modifiedProfile = {
        ...profile,
        ...data,
      };

      store.byId[id] = modifiedProfile;
    },
  },
});

const {
  profilesRequested,
  profilesReceived,
  profilesRequestFailed,
  profileSelected,
  profileModified,
} = slice.actions;

export default slice.reducer;

// Action creators
export const requestProfiles = (dispatch: AppDispatch, getState: any) => {
  const { isLoading } = getState().profile;

  if (isLoading) return;

  dispatch({
    type: profilesRequested.type,
  });

  try {
    const byId: ProfileList = {
      Work_Profile_ID: {
        id: 'Work_Profile_ID',
        name: 'Work',
        alwaysEnabled: true,
        criterionListIds: ['Allow_CriterionList_ID_1', 'Block_CriterionList_ID_1'],
        enabledInDays: [false, false, true, false, false, true, true],
        enabledInRange: { from: '16:00', to: '17:00' },
        isEditing: false,
        editingCriteriaType: null,
      },
      Study_Profile_ID: {
        id: 'Study_Profile_ID',
        name: 'Study',
        alwaysEnabled: false,
        criterionListIds: ['Allow_CriterionList_ID_2', 'Block_CriterionList_ID_2'],
        enabledInDays: [false, true, true, true, false, false, true],
        enabledInRange: { from: '09:00', to: '12:00' },
        isEditing: false,
        editingCriteriaType: null,
      },
    };

    const allIds: string[] = ['Work_Profile_ID', 'Study_Profile_ID'];

    return dispatch({
      type: profilesReceived.type,
      payload: {
        byId,
        allIds,
      },
    });
  } catch (error) {
    dispatch({
      type: profilesRequestFailed.type,
    });
  }
};

export const changeSelectedProfile =
  (id: string) => (dispatch: AppDispatch, getState: any) => {
    const { selectedProfileId }: ProfilesInitialState = getState().profile;
    if (id === selectedProfileId) return;

    dispatch({
      type: profileSelected.type,
      payload: {
        selectedProfileId: id,
      },
    });
  };

export const setEnabledRange =
  (profileId: string, newTime: string, type: TimeRange) =>
  (dispatch: AppDispatch, getState: any) => {
    const { byId }: ProfilesInitialState = getState().profile;

    const selectedProfile = byId[profileId];

    if (!selectedProfile)
      return console.error('Could not find the profile with id => ', profileId);

    const validatorRegex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g;

    const validation = validatorRegex.test(newTime);
    if (!validation) return;

    let sanitized = formatTime(newTime);

    const newRange = { ...selectedProfile.enabledInRange };

    if (type === TimeRange.From) {
      newRange.from = sanitized;
    } else {
      newRange.to = sanitized;
    }

    dispatch({
      type: profileModified.type,
      payload: {
        id: profileId,
        data: {
          enabledInRange: newRange,
        },
      },
    });
  };

export const setProfileData =
  (profileId: string, data: Partial<Profile>) => (dispatch: AppDispatch) => {
    dispatch({
      type: profileModified.type,
      payload: {
        id: profileId,
        data,
      },
    });
  };

// Selectors
export const getUserProfiles = createSelector(
  (state: RootState) => state.profile,
  ({ allIds, byId }) => allIds.map(id => byId[id])
);

export const getUserProfilesLoaded = createSelector(
  (state: RootState) => state.profile,
  profile => profile.hasLoaded
);

export const getSelectedProfile = createSelector(
  (state: RootState) => state.profile,
  ({ byId, selectedProfileId }) => byId[selectedProfileId]
);
