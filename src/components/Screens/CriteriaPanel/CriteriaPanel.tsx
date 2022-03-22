import { createRef } from 'react';
import Button from '../../common/Button';
import Scrollable from '../../common/Scrollable/Scrollable';
import TagGroupController from '../../Tags/TagGroupController';
import styles from './criteria_panel.module.css';

interface CriteriaPanelProps {
  criteriaList: Criteria[];
  activeCriteria: Criteria;
  onChangeCriteria: (id: string) => void;
  onDone?: () => void;
  doneBtnClasses?: string;
  tagsClasses?: string;
}

/***
 * Renders a scrollable row of buttons, mapped from the criterias list, and a TagGroup to display the tags of the current active criteria.
 * @param {Criteria[]} criteriaList - Criteria array to be rendered.
 * @param {Criteria} activeCriteria - Current active (selected) criteria.
 * @param {(id: string) => void} onChangeCriteria - Callback function to be called on the change of the selected criteria. It receives the new selected criteria ID as first arg.
 * @param {() => void} onDone - Callback function to be called on the Done button click.
 * @param {string} doneBtnClasses - Optional classes to the Done button.
 * @param {string} tagsClasses - Optional classes to be applied to each tag.
 */
const CriteriaPanel = ({
  criteriaList,
  activeCriteria,
  onChangeCriteria,
  onDone,
  doneBtnClasses = '',
  tagsClasses = '',
}: CriteriaPanelProps) => {
  const containerRef = createRef<HTMLDivElement>();

  return (
    <div ref={containerRef} className={styles.container}>
      <Scrollable
        containerClasses={styles.criteriaTypeContainer}
        containerRef={containerRef}
        itemsWidth={129}
        itemsPerPage={3}
      >
        {criteriaList.map(criteria => (
          <Button
            classes={`${styles.criteriaType} ${
              criteria.id === activeCriteria.id ? styles.criteriaTypeActive : ''
            }`}
            onClick={() => onChangeCriteria(criteria.id)}
            key={criteria.id}
            children={<div className={styles.criteriaTitle}>{criteria.name}</div>}
          />
        ))}
      </Scrollable>
      <div className={styles.innerContainer}>
        <TagGroupController
          criteria={activeCriteria}
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
