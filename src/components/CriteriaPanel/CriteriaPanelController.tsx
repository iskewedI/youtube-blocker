import { useState } from 'react';
import { uuid } from '../../service/utils';
import { CriteraListType } from '../CriteriaList/CriteriaListController';
import CriteriaPanel from './CriteriaPanel';
import styles from './criteria_panel.module.css';

const criterias = [
  {
    name: 'Tags',
    tags: [
      { id: uuid(), title: '#videogames' },
      { id: uuid(), title: '#history' },
      { id: uuid(), title: '#bloopers' },
      { id: uuid(), title: '#memes' },
      { id: uuid(), title: '#callofduty' },
      { id: uuid(), title: '#battlefield' },
      { id: uuid(), title: '#games' },
      { id: uuid(), title: '#trailers' },
      { id: uuid(), title: '#starwars' },
      { id: uuid(), title: '#got' },
      { id: uuid(), title: '#trailers' },
      { id: uuid(), title: '#starwars' },
      { id: uuid(), title: '#got' },
      { id: uuid(), title: '#trailers' },
      { id: uuid(), title: '#starwars' },
      { id: uuid(), title: '#got' },
    ],
    id: uuid(),
  },
  {
    name: 'Titles',
    tags: [
      { id: uuid(), title: 'Veritasium' },
      { id: uuid(), title: 'CdeCiencia' },
      { id: uuid(), title: 'El Robot De Platón' },
    ],
    id: uuid(),
  },
  {
    name: 'Channeles',
    tags: [
      { id: uuid(), title: 'Veritasium 3' },
      { id: uuid(), title: 'CdeCiencia 3' },
      { id: uuid(), title: 'El Robot De Platón 3' },
    ],
    id: uuid(),
  },
  {
    name: 'Channeles2',
    tags: [
      { id: uuid(), title: 'Veritasium 4' },
      { id: uuid(), title: 'CdeCiencia 4' },
      { id: uuid(), title: 'El Robot De Platón 4' },
    ],
    id: uuid(),
  },
];

interface ICriteriaPanelControllerProps {
  type: CriteraListType;
  onDone: () => void;
}

interface ICriteriaChange {
  added: string[];
  removed: string[];
}

interface IChanges {
  [id: string]: ICriteriaChange;
}

const CriteriaPanelController = ({ type, onDone }: ICriteriaPanelControllerProps) => {
  const [active, setActive] = useState<string>(criterias[0].id);
  const [changes, setChanges] = useState<IChanges>();

  const handleDone = () => {
    if (onDone && typeof onDone === 'function') {
      onDone();
    }
  };

  const handleCriteriaRemove = (id: string) => {
    const criteria = criterias.find(crit => crit.id === active);
    if (criteria) {
      criteria.tags = criteria.tags.filter(tag => tag.id !== id);
    }

    setChanges(lastChanges => {
      const newChanges: ICriteriaChange =
        lastChanges && lastChanges[active]
          ? lastChanges[active]
          : { added: [], removed: [] };

      newChanges.removed.push(id);

      return { ...lastChanges, [active]: newChanges };
    });
  };

  const { doneBtnClasses, tagsClasses } =
    type === CriteraListType.Allow
      ? { doneBtnClasses: styles.allowDoneBtn, tagsClasses: styles.allowTags }
      : { doneBtnClasses: styles.blockDoneBtn, tagsClasses: styles.blockTags };

  return (
    <CriteriaPanel
      criterias={criterias}
      active={active}
      onChangeCriteria={(id: string) => setActive(id)}
      onDone={handleDone}
      onTagRemove={handleCriteriaRemove}
      doneBtnClasses={doneBtnClasses}
      tagsClasses={tagsClasses}
    />
  );
};

export default CriteriaPanelController;
