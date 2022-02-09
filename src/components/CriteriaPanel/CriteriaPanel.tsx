import { createRef, useState } from 'react';
import { uuid } from '../../service/utils';
import Button from '../common/Button';
import Scrollable from '../Scrollable/Scrollable';
import TagCollectionController from '../Tags/TagGroupController';
import styles from './criteria_panel.module.css';

interface ICriteriaPanelProps {
  criterias: {
    name: string;
    tags: {
      id: string;
      title: string;
    }[];
    id: string;
  }[];
  active: string;
  onChangeCriteria: (id: string) => void;
  onTagRemove: (id: string) => void;
  onDone?: () => void;
  doneBtnClasses?: string;
  tagsClasses?: string;
}

const CriteriaPanel = ({
  criterias,
  active,
  onChangeCriteria,
  onTagRemove,
  onDone,
  doneBtnClasses = '',
  tagsClasses = '',
}: ICriteriaPanelProps) => {
  const containerRef = createRef<HTMLDivElement>();

  const criteriaActive = criterias.find(criteria => criteria.id === active);

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
            onClick={() => onChangeCriteria(criteria.id)}
            key={criteria.id}
            children={<div className={styles.criteriaTitle}>{criteria.name}</div>}
          />
        ))}
      </Scrollable>
      <div className={styles.innerContainer}>
        <TagCollectionController
          startTags={criteriaActive?.tags}
          onTagRemove={onTagRemove}
          containerClasses={styles.tagCollectionContainer}
          tagsClasses={tagsClasses}
        />
        <Button
          title='Done'
          onClick={onDone}
          classes={`${styles.doneBtn} ${doneBtnClasses}`}
        />
      </div>
    </div>
  );
};

export default CriteriaPanel;
