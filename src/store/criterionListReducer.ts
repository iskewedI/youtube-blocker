import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CriteriaListType } from '../types/enums';
import { AppDispatch, RootState } from './configureStore';

const initialState: CriterionListInitialState = {
  hasError: false,
  isLoading: false,
  hasLoaded: false,
  byId: {},
  allIds: [],
};

const slice = createSlice({
  name: 'criterionList',
  initialState,
  reducers: {
    criterionListsRequested: store => {
      store.isLoading = true;
    },
    criterionListsReceived: (store, action) => {
      store.byId = action.payload.byId;
      store.allIds = action.payload.allIds;

      store.isLoading = false;
      store.hasError = false;
    },
    criterionListsRequestFailed: store => {
      store.byId = {};
      store.allIds = [];

      store.isLoading = false;
      store.hasError = true;
    },
  },
});

const { criterionListsRequested, criterionListsReceived, criterionListsRequestFailed } =
  slice.actions;

export default slice.reducer;

// Action creators
export const requestCriterionLists = (dispatch: AppDispatch, getState: any) => {
  const { isLoading } = getState().criterionList;

  if (isLoading) return;

  dispatch({
    type: criterionListsRequested.type,
  });

  try {
    const byId: CriterionList = {
      Allow_CriterionList_ID_1: {
        criteriaIds: [
          'Tags_Criteria_ID_1',
          'Channels_Criteria_ID_1',
          'Titles_Criteria_ID_1',
        ],
        id: 'Allow_CriterionList_ID_1',
        type: CriteriaListType.Allow,
      },
      Block_CriterionList_ID_1: {
        criteriaIds: [
          'Tags_Criteria_ID_2',
          'Channels_Criteria_ID_2',
          'Titles_Criteria_ID_2',
        ],
        id: 'Block_CriterionList_ID_1',
        type: CriteriaListType.Block,
      },
      Allow_CriterionList_ID_2: {
        criteriaIds: [
          'Tags_Criteria_ID_3',
          'Channels_Criteria_ID_3',
          'Titles_Criteria_ID_3',
        ],
        id: 'Allow_CriterionList_ID_2',
        type: CriteriaListType.Allow,
      },
      Block_CriterionList_ID_2: {
        criteriaIds: [
          'Tags_Criteria_ID_4',
          'Channels_Criteria_ID_4',
          'Titles_Criteria_ID_4',
        ],
        id: 'Block_CriterionList_ID_2',
        type: CriteriaListType.Block,
      },
    };

    const allIds: string[] = [
      'Allow_CriterionList_ID_1',
      'Block_CriterionList_ID_1',
      'Allow_CriterionList_ID_2',
      'Block_CriterionList_ID_2',
    ];

    return dispatch({
      type: criterionListsReceived.type,
      payload: {
        byId,
        allIds,
      },
    });
  } catch (error) {
    dispatch({
      type: criterionListsRequestFailed.type,
    });
  }
};

// Selectors
export const getCriterionListsLoaded = createSelector(
  (state: RootState) => state.criterionList,
  criterionList => criterionList.hasLoaded
);

export const getCriterionLists = createSelector(
  (state: RootState) => state.criterionList,
  ({ allIds, byId }) => allIds.map(id => byId[id])
);
