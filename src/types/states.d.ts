interface ListState {
  isAdding: boolean;
}

interface InputState {
  selectedOptionId: string;
  inputValue: string;
}

interface SelectOption {
  id: string;
  title: string;
}

interface ScrollState {
  isScrolling: boolean;
  itemsOffset: {
    x: number;
    y: number;
  };
  currentPage: number;
  pagesCount: number;
}

// Store
interface Reducer {
  isLoading: boolean;
  hasError: boolean;
  hasLoaded: boolean;
  allIds: string[];
}

interface ProfilesInitialState extends Reducer {
  byId: ProfileList;
  selectedProfileId: string;
}

interface CriterionListInitialState extends Reducer {
  byId: CriterionList;
}

interface CriteriaInitialState extends Reducer {
  byId: CriteriaList;
}

interface TagInitialState extends Reducer {
  byId: TagList;
}
