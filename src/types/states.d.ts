interface ProfileState {
  isEditing: boolean;
  editingProfileId: string | null;
  editingProfileType: CriteraListType | null;
}

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

interface AppState {
  currentScreen: Screens;
}

// Store

interface ProfilesInitialState {
  isLoading: boolean,
  hasError: boolean,
  profilesLoaded: boolean,
  userProfiles: Profile[],
  selectedProfileId: string,
}