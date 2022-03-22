import { useEffect, useMemo, useState } from 'react';
import ListIcon from '../common/icons/ListIcon';
import PlusIcon from '../common/icons/PlusIcon';
import CrossIcon from '../common/icons/CrossIcon';
import TickIcon from '../common/icons/TickIcon';
import CriteriaList from './CriteriaList';
import styles from './criteria_list.module.css';
import { uuid } from '../../service/utils';
import { CriteriaListType } from '../../types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { createTag } from '../../store/tagReducer';
import { appendTagIds, getCriterias } from '../../store/criteriaReducer';

interface CriteriaListControllerProps {
  type: CriteriaListType;
  criteriaIds: string[];
  onEdit: () => void;
}

/***
 * Controller for the CriteriaList view. Handles the buttons form/input actions to add new criterias to the list, and calls the onEdit callback to render the new screen.
 * @param {CriteriaListType} type - Defines which type of Criteria List is, that changes some colors in the view.
 * @param {string[]} criteriaIds - String array containing the criteria ID's that will be rendered as options
 * @param {() => void} onEdit - Callback function to be called when the Edit button is pressed.
 */
const CriteriaListController = ({
  type,
  criteriaIds,
  onEdit,
}: CriteriaListControllerProps) => {
  const [listState, setListState] = useState<ListState>({
    isAdding: false,
  });

  const [inputFormState, setInputFormState] = useState<InputState>({
    selectedOptionId: '',
    inputValue: '',
  });

  const dispatch = useDispatch();

  const criterias = useSelector(getCriterias);

  const currentCriterias = useMemo(
    () => criterias.filter(criteria => criteriaIds.includes(criteria.id)),
    [criterias, criteriaIds]
  );

  const selectOptions: SelectOption[] = useMemo(
    () =>
      currentCriterias.map(criteria => ({
        id: criteria.id,
        title: criteria.name,
      })),
    [currentCriterias]
  );

  useEffect(() => {
    if (!inputFormState.selectedOptionId && currentCriterias.length > 0) {
      setInputFormState({ selectedOptionId: currentCriterias[0].id, inputValue: '' });
    }
  }, [currentCriterias, inputFormState.selectedOptionId, setInputFormState]);

  const toggleAdding = (isAdding: boolean) => {
    setListState(state => ({ ...state, isAdding }));
  };

  /***
   * Cleaning function to be called in the Form Cancel event.
   */
  const handleFormCancel = () => {
    setInputFormState(state => ({
      ...state,
      selectedOptionId: currentCriterias[0].id,
      inputValue: '',
    }));

    toggleAdding(false);
  };

  /***
   * Used in the Form Submit of the CriteriaList Input and the click of the right icon in the same component (both means the user saving a new criteria).
   * It uses the current Input Form State values.
   * Handles the Add New Criteria operation with the store.
   */
  const handleAddCriteria = () => {
    const { inputValue, selectedOptionId } = inputFormState;

    if (!inputValue) return;

    const tag = { title: inputValue, id: uuid() };

    dispatch(createTag(tag));
    dispatch(appendTagIds(selectedOptionId, [tag.id]));

    setInputFormState(state => ({ ...state, inputValue: '' }));
  };

  const handleSelectChange = (selectedOptionId: string) => {
    setInputFormState(state => ({ ...state, selectedOptionId }));
  };

  const handleInputChange = (currentValue: string) => {
    setInputFormState(state => ({ ...state, inputValue: currentValue }));
  };

  const { isAdding } = listState;

  const { title, buttonsClasses } =
    type === CriteriaListType.Allow
      ? { title: 'Allow', buttonsClasses: `${styles.listBtn} ${styles.allowListBtn}` }
      : { title: 'Block', buttonsClasses: `${styles.listBtn} ${styles.blockListBtn}` };

  const buttons = [
    {
      classes: buttonsClasses,
      content: !isAdding ? (
        <ListIcon width={20} height={20} />
      ) : (
        <CrossIcon width={18} height={18} />
      ),
      onClick: !isAdding ? onEdit : handleFormCancel,
    },
    {
      classes: buttonsClasses,
      content: !isAdding ? (
        <PlusIcon width={20} height={20} />
      ) : (
        <TickIcon width={20} height={20} />
      ),
      onClick: !isAdding ? () => toggleAdding(true) : handleAddCriteria,
    },
  ];

  return (
    <CriteriaList
      title={title}
      buttons={buttons}
      renderInput={isAdding}
      selectProps={{ options: selectOptions, onChange: handleSelectChange }}
      inputProps={{
        value: inputFormState.inputValue,
        onChange: handleInputChange,
        onSubmit: handleAddCriteria,
        autofocus: true,
      }}
    />
  );
};

export default CriteriaListController;
