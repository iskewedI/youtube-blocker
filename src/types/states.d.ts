interface ProfileState {
  isEditing: boolean;
  editingProfileId: string | null;
  editingProfileType: CriteraListType | null;
  alwaysEnabled: boolean;
  enabledInRange: {
    from: string;
    to: string;
  };
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
