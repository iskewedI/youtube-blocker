import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Categories } from '../types/enums';
import { AppDispatch, RootState } from './configureStore';

const initialState: CriteriaInitialState = {
  hasError: false,
  isLoading: false,
  hasLoaded: false,
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    criteriaRequested: store => {
      store.isLoading = true;
    },
    criteriaReceived: (store, action) => {
      store.byId = action.payload.byId;
      store.allIds = action.payload.allIds;

      store.isLoading = false;
      store.hasError = false;
    },
    criteriaRequestFailed: store => {
      store.byId = {};
      store.allIds = [];

      store.isLoading = false;
      store.hasError = true;
    },
    tagIdsAdded: (store, action) => {
      const { byId } = store;
      const { id, tagIds } = action.payload;

      byId[id].tagIds.push(...tagIds);
    },
    tagsIdsRemoved: (store, action) => {
      const { byId } = store;
      const { id, tagIds } = action.payload;

      byId[id].tagIds = byId[id].tagIds.filter(tagId => !tagIds.includes(tagId));
    },
  },
});

const {
  criteriaRequested,
  criteriaReceived,
  criteriaRequestFailed,
  tagIdsAdded,
  tagsIdsRemoved,
} = slice.actions;

export default slice.reducer;

// Action creators
export const requestCriteria = (dispatch: AppDispatch, getState: any) => {
  const { isLoading } = getState().criteria;

  if (isLoading) return;

  dispatch({
    type: criteriaRequested.type,
  });

  try {
    const byId: CriteriaList = {
      Tags_Criteria_ID_1: {
        tagIds: ['FocusMusic_Tags_ID_1'],
        id: 'Tags_Criteria_ID_1',
        name: 'Tags',
        category: Categories.Tags,
      },
      Channels_Criteria_ID_1: {
        tagIds: ['Verisatium_Tags_ID_1'],
        id: 'Channels_Criteria_ID_1',
        name: 'Channels',
        category: Categories.Channels,
      },
      Titles_Criteria_ID_1: {
        tagIds: ['Programming_Tags_ID_1'],
        id: 'Titles_Criteria_ID_1',
        name: 'Titles',
        category: Categories.Titles,
      },
      Tags_Criteria_ID_2: {
        tagIds: ['Games_Tags_ID_1'],
        id: 'Tags_Criteria_ID_2',
        name: 'Tags',
        category: Categories.Tags,
      },
      Channels_Criteria_ID_2: {
        tagIds: ['8cho_Tags_ID_1'],
        id: 'Channels_Criteria_ID_2',
        name: 'Channels',
        category: Categories.Channels,
      },
      Titles_Criteria_ID_2: {
        tagIds: ['Speedrun_Title_ID_1'],
        id: 'Titles_Criteria_ID_2',
        name: 'Titles',
        category: Categories.Titles,
      },
      Tags_Criteria_ID_3: {
        tagIds: ['FocusMusic_Tags_ID_1'],
        id: 'Tags_Criteria_ID_3',
        name: 'Tags',
        category: Categories.Tags,
      },
      Channels_Criteria_ID_3: {
        tagIds: ['Verisatium_Tags_ID_1'],
        id: 'Channels_Criteria_ID_3',
        name: 'Channels',
        category: Categories.Channels,
      },
      Titles_Criteria_ID_3: {
        tagIds: ['Programming_Tags_ID_1'],
        id: 'Titles_Criteria_ID_3',
        name: 'Titles',
        category: Categories.Titles,
      },
      Tags_Criteria_ID_4: {
        tagIds: ['Games_Tags_ID_1'],
        id: 'Tags_Criteria_ID_4',
        name: 'Tags',
        category: Categories.Tags,
      },
      Channels_Criteria_ID_4: {
        tagIds: ['8cho_Tags_ID_1'],
        id: 'Channels_Criteria_ID_4',
        name: 'Channels',
        category: Categories.Channels,
      },
      Titles_Criteria_ID_4: {
        tagIds: ['Speedrun_Title_ID_1'],
        id: 'Titles_Criteria_ID_4',
        name: 'Titles',
        category: Categories.Titles,
      },
    };

    const allIds: string[] = [
      'Tags_Criteria_ID_1',
      'Channels_Criteria_ID_1',
      'Titles_Criteria_ID_1',
      'Tags_Criteria_ID_2',
      'Channels_Criteria_ID_2',
      'Titles_Criteria_ID_2',
      'Tags_Criteria_ID_3',
      'Channels_Criteria_ID_3',
      'Titles_Criteria_ID_3',
      'Tags_Criteria_ID_4',
      'Channels_Criteria_ID_4',
      'Titles_Criteria_ID_4',
    ];

    return dispatch({
      type: criteriaReceived.type,
      payload: {
        byId,
        allIds,
      },
    });
  } catch (error) {
    dispatch({
      type: criteriaRequestFailed.type,
    });
  }
};

export const appendTagIds =
  (criteriaId: string, tagIds: string[]) => (dispatch: AppDispatch, getState: any) => {
    const { allIds }: CriteriaInitialState = getState().criteria;

    const index = allIds.indexOf(criteriaId);

    if (index === -1)
      return console.error('Could not find Criteria List with id => ', criteriaId);

    dispatch({
      type: tagIdsAdded.type,
      payload: {
        id: criteriaId,
        tagIds,
      },
    });
  };

export const removeCriteriaTags =
  (criteriaId: string, tagIds: string[]) => (dispatch: AppDispatch, getState: any) => {
    const { allIds }: CriteriaInitialState = getState().criteria;

    const index = allIds.indexOf(criteriaId);

    if (index === -1)
      return console.error('Could not find Criteria List with id => ', criteriaId);

    dispatch({
      type: tagsIdsRemoved.type,
      payload: {
        id: criteriaId,
        tagIds,
      },
    });
  };

// Selectors
export const getCriteriasLoaded = createSelector(
  (state: RootState) => state.criteria,
  criteria => criteria.hasLoaded
);

export const getCriterias = createSelector(
  (state: RootState) => state.criteria,
  ({ allIds, byId }) => allIds.map(id => byId[id])
);
