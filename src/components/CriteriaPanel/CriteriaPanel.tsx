import { createRef, useState } from 'react';
import { uuid } from '../../service/utils';
import Button from '../common/Button';
import Scrollable from '../Scrollable/Scrollable';
import TagCollectionController from '../Tags/TagGroupController';
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

interface ICriteriaChange {
  added: string[];
  removed: string[];
}

interface IChanges {
  [id: string]: ICriteriaChange;
}

interface ICriteriaPanelProps {
  onDone?: (changes: IChanges | undefined) => void;
}

const CriteriaPanel = ({ onDone }: ICriteriaPanelProps) => {
  const [active, setActive] = useState<string>(criterias[0].id);
  const [changes, setChanges] = useState<IChanges>();

  const containerRef = createRef<HTMLDivElement>();

  const criteriaActive = criterias.find(criteria => criteria.id === active);

  const onCriteriaRemove = (id: string) => {
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

  const handleDone = () => {
    if (onDone && typeof onDone === 'function') {
      onDone(changes);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <Scrollable
        containerClasses={styles.criteriaTypeContainer}
        containerRef={containerRef}
        itemsWidth={129}
        itemsPerPage={3}
      >
        {criterias.map(criteria => (
          <Button
            classes={`${styles.criteriaType} ${
              criteria.id === active ? styles.criteriaTypeActive : ''
            }`}
            onClick={() => setActive(criteria.id)}
            key={criteria.id}
            children={<div className={styles.criteriaTitle}>{criteria.name}</div>}
          />
        ))}
      </Scrollable>
      <div className={styles.innerContainer}>
        <TagCollectionController
          startTags={criteriaActive?.tags}
          onTagRemove={onCriteriaRemove}
          containerClasses={styles.tagCollectionContainer}
        />
        <Button title='Done' onClick={handleDone} classes={styles.doneBtn} />
      </div>
    </div>
  );
};

export default CriteriaPanel;
