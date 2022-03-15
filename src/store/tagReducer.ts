import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './configureStore';

const initialState: TagInitialState = {
  hasError: false,
  isLoading: false,
  hasLoaded: false,
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    tagRequested: store => {
      store.isLoading = true;
    },
    tagReceived: (store, action) => {
      store.byId = action.payload.byId;
      store.allIds = action.payload.allIds;

      store.isLoading = false;
      store.hasError = false;
    },
    tagRequestFailed: store => {
      store.byId = {};
      store.allIds = [];

      store.isLoading = false;
      store.hasError = true;
    },
    tagAdded: (store, action) => {
      const { tag } = action.payload;

      store.byId[tag.id] = tag;
      store.allIds.push(tag.id);
    },
    tagRemoved: (store, action) => {
      const { tag } = action.payload;

      const index = store.allIds.indexOf(tag.id);

      store.allIds.splice(index, 1);
      delete store.byId[tag.id];
    },
    tagEdited: (store, action) => {
      const { tag, newTag } = action.payload;

      store.byId[tag.id] = newTag;
    },
  },
});

const { tagRequested, tagReceived, tagRequestFailed, tagAdded, tagRemoved, tagEdited } =
  slice.actions;

export default slice.reducer;

// Action creators
export const requestTags = (dispatch: AppDispatch, getState: any) => {
  const { isLoading } = getState().tag;

  if (isLoading) return;

  dispatch({
    type: tagRequested.type,
  });

  try {
    const byId: TagList = {
      FocusMusic_Tags_ID_1: {
        id: 'FocusMusic_Tags_ID_1',
        title: 'Focus Music',
      },
      Verisatium_Tags_ID_1: {
        id: 'Verisatium_Tags_ID_1',
        title: 'Verisatium',
      },
      Programming_Tags_ID_1: {
        id: 'Programming_Tags_ID_1',
        title: 'Programming',
      },
      Games_Tags_ID_1: {
        id: 'Games_Tags_ID_1',
        title: 'Games',
      },
      '8cho_Tags_ID_1': {
        id: '8cho_Tags_ID_1',
        title: '8cho',
      },
      Speedrun_Tags_ID_1: {
        id: 'Speedrun_Tags_ID_1',
        title: 'Speedrun',
      },
    };

    const allIds: string[] = [
      'FocusMusic_Tags_ID_1',
      'Verisatium_Tags_ID_1',
      'Programming_Tags_ID_1',
      'Games_Tags_ID_1',
      '8cho_Tags_ID_1',
      'Speedrun_Tags_ID_1',
    ];

    return dispatch({
      type: tagReceived.type,
      payload: {
        byId,
        allIds,
      },
    });
  } catch (error) {
    dispatch({
      type: tagRequestFailed.type,
    });
  }
};

export const createTag = (tag: Tag) => (dispatch: AppDispatch, getState: any) => {
  const { allIds }: TagInitialState = getState().tag;

  if (allIds.indexOf(tag.id) >= 0)
    return console.error("Couldn't create already existant tag => ", tag);

  dispatch({
    type: tagAdded.type,
    payload: {
      tag,
    },
  });
};

export const removeTag = (id: string) => (dispatch: AppDispatch, getState: any) => {
  const { allIds, byId }: TagInitialState = getState().tag;

  const index = allIds.indexOf(id);
  if (index === -1) return console.error('Could not find tag to remove with id => ', id);

  const tag = byId[id];

  dispatch({
    type: tagRemoved.type,
    payload: {
      tag,
    },
  });
};

export const editTagTitle =
  (id: string, title: string) => (dispatch: AppDispatch, getState: any) => {
    const { allIds, byId }: TagInitialState = getState().tag;

    const index = allIds.indexOf(id);
    if (index === -1)
      return console.error('Could not find tag to remove with id => ', id);

    const tag = byId[id];

    const newTag = { ...tag, title };

    dispatch({
      type: tagEdited.type,
      payload: {
        tag,
        newTag,
      },
    });
  };

// Selectors
export const getTagsLoaded = createSelector(
  (state: RootState) => state.tag,
  tag => tag.hasLoaded
);

export const getTags = createSelector(
  (state: RootState) => state.tag,
  ({ allIds, byId }) => allIds.map(id => byId[id])
);
