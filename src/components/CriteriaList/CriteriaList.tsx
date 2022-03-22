import Button from '../common/Button';
import Input, { InputProps } from '../common/Input';
import Select, { SelectProps } from '../common/Select';

import styles from './criteria_list.module.css';

interface CriteriaListProps {
  title: string;
  buttons: CriteriaButtons[];
  renderInput: boolean;
  selectProps: SelectProps;
  inputProps: InputProps;
}

/***
 * CriteriaList view component, that renders an Icon - Text OR Select & Input - Icon in a row, defined by its controller.
 * @param {string} title - The title of the list
 * @param {CriteriaButtons[]} buttons - Array of buttons object (left and right) that should be rendered.
 * @param {boolean} renderInput - Boolean that defines if the view should render the Select&Input components (is adding a new criteria) or only the title.
 * @param {SelectProps} selectProps - Group of params for the Select component.
 * @param {InputProps} inputProps - Group of params for the Input component.
 */
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
              value={inputProps.value}
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
