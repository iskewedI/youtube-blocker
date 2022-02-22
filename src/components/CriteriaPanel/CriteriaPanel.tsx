import { createRef } from 'react';
import Button from '../common/Button';
import Scrollable from '../common/Scrollable/Scrollable';
import TagGroupController from '../Tags/TagGroupController';
import styles from './criteria_panel.module.css';

interface CriteriaPanelProps {
  criterias: Criteria[];
  active: string;
  onChangeCriteria: (id: string) => void;
  onTagRemove: (id: string) => void;
  onDone?: () => void;
  doneBtnClasses?: string;
  tagsClasses?: string;
}

/***
 * Renders a scrollable row of buttons, mapped from the criterias list, and a TagGroup to display the tags of the current active criteria.
 * @param {Criteria[]} criterias - Criteria array to be rendered.
 * @param {string} active - ID of the current active criteria.
 * @param {(id: string) => void} onChangeCriteria - Callback function to be called on the change of the selected criteria. It receives the new selected criteria ID as first arg.
 * @param {(id: string) => void} onTagRemove - Callback function to be called on the remove of any tag. It receives the removed tag ID as first arg.
 * @param {() => void} onDone - Callback function to be called on the Done button click.
 * @param {string} doneBtnClasses - Optional classes to the Done button.
 * @param {string} tagsClasses - Optional classes to be applied to each tag.
 */
const CriteriaPanel = ({
  criterias,
  active,
  onChangeCriteria,
  onTagRemove,
  onDone,
  doneBtnClasses = '',
  tagsClasses = '',
}: CriteriaPanelProps) => {
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
        <TagGroupController
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
