interface Profile {
  id: string;
  name: string;
  enabledInDays: boolean[];
  criterias: Criteria[];
  alwaysEnabled: boolean;
  enabledInRange: {
    from: string;
    to: string;
  };
}

interface ProfileData {
  id?: string;
  name?: string;
  enabledInDays?: boolean[];
  alwaysEnabled?: boolean;
  enabledInRange?: {
    from: string;
    to: string;
  };
}

interface Criteria {
  id: string;
  name: string;
  tags: Tag[];
}

interface CriteriaList {
  data: { option: string; value: string }[];
  id: string;
  type: CriteraListType;
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

interface Changes {
  [id: string]: CriteriaChange;
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

interface Entity {
  id: string;
  name: string;
}
