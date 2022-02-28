import { createSelector, createSlice } from '@reduxjs/toolkit';
import { formatTime, uuid } from '../service/utils';
import { TimeRange } from '../types/enums';
import { AppDispatch, RootState } from './configureStore';

const initialState: ProfilesInitialState = {
  isLoading: false,
  hasError: false,
  profilesLoaded: false,
  userProfiles: [],
  selectedProfileId: '',
};

const slice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    profilesRequested: store => {
      store.isLoading = true;
    },
    profilesReceived: (store, action) => {
      store.userProfiles = action.payload.profiles;
      if (action.payload.profiles && action.payload.profiles.length > 0) {
        store.selectedProfileId = action.payload.profiles[0].id;
      }

      store.profilesLoaded = true;
      store.isLoading = false;
      store.hasError = false;
    },
    profilesRequestFailed: store => {
      store.userProfiles = [];

      store.profilesLoaded = true;
      store.isLoading = false;
      store.hasError = true;
    },
    profileSelected: (store, action) => {
      store.selectedProfileId = action.payload.selectedProfileId;
    },
    profileModified: (store, action) => {
      const { id, data } = action.payload;

      const profileIndex = store.userProfiles.findIndex(profile => profile.id === id);
      if (profileIndex < 0)
        return console.error('Could not find the profile with id => ', id);

      const modifiedProfile = { ...store.userProfiles[profileIndex], ...data };

      store.userProfiles[profileIndex] = modifiedProfile;
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
    const mockedProfiles: Profile[] = [
      {
        id: uuid(),
        name: 'Work',
        alwaysEnabled: true,
        criterias: [{ id: uuid(), name: 'Allow', tags: [{ id: uuid(), title: 'Tag1' }] }],
        enabledInDays: [false, false, true, false, false, true, true],
        enabledInRange: { from: '16:00', to: '17:00' },
      },
      {
        id: uuid(),
        name: 'Study',
        alwaysEnabled: false,
        criterias: [{ id: uuid(), name: 'Allow', tags: [{ id: uuid(), title: 'Tag1' }] }],
        enabledInDays: [false, true, true, true, false, false, true],
        enabledInRange: { from: '09:00', to: '12:00' },
      },
    ];
  
    return dispatch({
      type: profilesReceived.type,
      payload: {
        profiles: mockedProfiles,
      },
    });
  } catch (error) {}

};

export const changeSelectedProfile =
  (id: string) => (dispatch: AppDispatch, getState: any) => {
    const { selectedProfileId } = getState().profile;
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
    const { userProfiles } = getState().profile;

    const selectedProfile: Profile = userProfiles.find(
      (profile: Profile) => profile.id === profileId
    );

    if (!selectedProfile) return console.error('Could not find the selected profile');

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
  (profileId: string, data: ProfileData) => (dispatch: AppDispatch) => {
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
  profile => profile.userProfiles
);

export const getUserProfilesLoaded = createSelector(
  (state: RootState) => state.profile,
  profile => profile.profilesLoaded
);

export const getSelectedProfile = createSelector(
  (state: RootState) => state.profile,
  ({ userProfiles, selectedProfileId }) =>
    userProfiles.find(profile => profile.id === selectedProfileId)
);
