import { useState } from 'react';
import ListIcon from '../common/icons/ListIcon';
import PlusIcon from '../common/icons/PlusIcon';
import CrossIcon from '../common/icons/CrossIcon';
import TickIcon from '../common/icons/TickIcon';
import CriteriaList from './CriteriaList';
import styles from './criteria_list.module.css';
import { uuid } from '../../service/utils';

const options = [
  {
    id: uuid(),
    title: 'Tags',
  },
  {
    id: uuid(),
    title: 'Titles',
  },
];

interface ListState {
  isAdding: boolean;
}

interface InputState {
  selectedOptionId: string;
  inputValue: string;
}

export enum CriteraListType {
  Allow = 1,
  Block,
}

interface CriteriaListControllerProps {
  data: { option: string; value: string }[];
  type: CriteraListType;
  onEdit: () => void;
}

const CriteriaListController = ({ data, type, onEdit }: CriteriaListControllerProps) => {
  const [listState, setListState] = useState<ListState>({
    isAdding: false,
  });

  const [inputFormState, setInputFormState] = useState<InputState>({
    selectedOptionId: options[0].id,
    inputValue: '',
  });

  const toggleAdding = (isAdding: boolean) => {
    setListState(state => ({ ...state, isAdding }));
  };

  const handleFormCancel = () => {
    setListState(state => ({
      ...state,
      selectedOptionId: options[0].id,
      inputValue: '',
    }));

    toggleAdding(false);
  };

  const handleFormSubmit = () => {
    const { inputValue, selectedOptionId } = inputFormState;

    setListState(state => ({ ...state, isAdding: false }));

    if (!inputValue) return;

    const selectedOption = options.find(option => option.id === selectedOptionId);

    if (!selectedOption)
      return console.error(
        'Could not find selected option with id => ',
        selectedOptionId
      );

    data.push({
      option: selectedOption.title,
      value: inputValue,
    });
  };

  const handleSelectChange = (selectedOptionId: string) => {
    setInputFormState(state => ({ ...state, selectedOptionId }));
  };

  const handleInputChange = (currentValue: string) => {
    setInputFormState(state => ({ ...state, inputValue: currentValue }));
  };

  const { isAdding } = listState;

  const { title, buttonsClasses } =
    type === CriteraListType.Allow
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
      onClick: !isAdding ? () => toggleAdding(true) : handleFormSubmit,
    },
  ];

  return (
    <CriteriaList
      title={title}
      buttons={buttons}
      renderInput={isAdding}
      selectProps={{ options, onChange: handleSelectChange }}
      inputProps={{
        onChange: handleInputChange,
        onSubmit: handleFormSubmit,
        autofocus: true,
      }}
    />
  );
};

export default CriteriaListController;
