import { ReactElement } from 'react';
import Button from '../common/Button';
import Input, { InputProps } from '../common/Input';
import Select, { SelectProps } from '../common/Select';

import styles from './criteria_list.module.css';

interface CriteriaListProps {
  title: string;
  buttons: {
    classes: string;
    content: ReactElement;
    onClick?: () => void;
  }[];
  renderInput: boolean;
  selectProps: SelectProps;
  inputProps: InputProps;
}

const CriteriaList = ({
  title,
  buttons,
  renderInput,
  selectProps,
  inputProps,
}: CriteriaListProps) => {
  return (
    <div className={styles.container}>
      <Button
        classes={buttons[0].classes}
        children={buttons[0].content}
        onClick={buttons[0].onClick}
      />

      <div className={styles.title}>
        {(renderInput && (
          <div className={styles.inputContainer}>
            <Select options={selectProps.options} onChange={selectProps.onChange} />
            <Input
              autofocus={inputProps.autofocus}
              onSubmit={inputProps.onSubmit}
              onChange={inputProps.onChange}
            />
          </div>
        )) ||
          title}
      </div>

      <Button
        classes={buttons[1].classes}
        children={buttons[1].content}
        onClick={buttons[1].onClick}
      />
    </div>
  );
};

export default CriteriaList;
