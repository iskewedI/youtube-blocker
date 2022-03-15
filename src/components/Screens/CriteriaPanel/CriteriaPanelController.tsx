import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCriterias } from '../../../store/criteriaReducer';
import { getCriterionLists } from '../../../store/criterionListReducer';
import { getSelectedProfile } from '../../../store/profileReducer';
import { changeScreen } from '../../../store/screenReducer';
import { CriteriaListType, Screens } from '../../../types/enums';
import CriteriaPanel from './CriteriaPanel';
import styles from './criteria_panel.module.css';

/***
 * Controller for the CriteriaPanel. Handles the styles that depends of the type, and the calls/operations to the store
 */
const CriteriaPanelController = () => {
  const [active, setActive] = useState<string>('');

  const dispatch = useDispatch();

  const selectedProfile = useSelector(getSelectedProfile);
  const criterionLists = useSelector(getCriterionLists);
  const criterias = useSelector(getCriterias);

  const currentCriterionList = useMemo(
    () =>
      criterionLists.find(
        criterion =>
          selectedProfile.criterionListIds.includes(criterion.id) &&
          selectedProfile.editingCriteriaType === criterion.type
      ),
    [
      criterionLists,
      selectedProfile.criterionListIds,
      selectedProfile.editingCriteriaType,
    ]
  );

  const currentCriterias = useMemo(
    () =>
      criterias.filter(criteria =>
        currentCriterionList?.criteriaIds.includes(criteria.id)
      ),
    [criterias, currentCriterionList?.criteriaIds]
  );

  const activeCriteria = useMemo(
    () => currentCriterias.find(criteria => criteria.id === active),
    [currentCriterias, active]
  );

  useEffect(() => {
    if (!selectedProfile.editingCriteriaType || currentCriterias.length === 0) return;

    if (!active) {
      setActive(currentCriterias[0].id);
    }
  }, [active, setActive, selectedProfile.editingCriteriaType, currentCriterias]);

  const handleDone = () => {
    dispatch(changeScreen(Screens.Profiles));
  };

  const { editingCriteriaType } = selectedProfile;

  const { doneBtnClasses, tagsClasses } =
    editingCriteriaType === CriteriaListType.Allow
      ? { doneBtnClasses: styles.allowDoneBtn, tagsClasses: styles.allowTags }
      : { doneBtnClasses: styles.blockDoneBtn, tagsClasses: styles.blockTags };

  if (!activeCriteria) return <div>Loading...</div>;

  return (
    <CriteriaPanel
      criteriaList={currentCriterias}
      activeCriteria={activeCriteria}
      onChangeCriteria={(id: string) => setActive(id)}
      onDone={handleDone}
      doneBtnClasses={doneBtnClasses}
      tagsClasses={tagsClasses}
    />
  );
};

export default CriteriaPanelController;
