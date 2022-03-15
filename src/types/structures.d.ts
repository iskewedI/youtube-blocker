interface Profile {
  id: string;
  name: string;
  enabledInDays: boolean[];
  criterionListIds: string[];
  alwaysEnabled: boolean;
  enabledInRange: {
    from: string;
    to: string;
  };
  isEditing: boolean;
  editingCriteriaType: number | null;
}

interface ProfileList {
  [id: string]: Profile;
}

interface Criteria {
  id: string;
  name: string;
  tagIds: string[];
  category: Categories;
}

interface CriteriaList {
  [id: string]: Criteria;
}

interface Criterion {
  id: string;
  type: CriteriaListType;
  criteriaIds: string[];
}

interface CriterionList {
  [id: string]: Criterion;
}

interface CriteriaButtons {
  classes: string;
  content: ReactElement;
  onClick?: () => void;
}

interface CriteriaChange {
  added: string[];
  removed: string[];
}

interface Day {
  active: boolean;
  id: string;
  title: string;
}

interface DOMData {
  containerWidth: number;
  pagesCount: number;
}

interface ScrollableChildren {
  ref?: React.RefObject<Element>;
  style?: CSSProperties;
}

interface Tag {
  id: string;
  title: string;
}

interface TagList {
  [id: string]: Tag;
}

interface Entity {
  id: string;
  name: string;
}
