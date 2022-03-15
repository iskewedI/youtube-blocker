import { useEffect, useState } from 'react';
import styles from './common.module.css';

export interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSubmit?: (text: string) => void;
  autofocus?: boolean;
  inputClasses?: string;
  startValue?: string;
  formStyle?: React.CSSProperties;
}

/***
 * Renders a Form with Input component, to handle the onChange and onSubmit event properly.
 * @param {string} value - Optional value parameter to make this component a controlled one.
 * @param {string} placeholder - Text for the input placeholder.
 * @param {(text: string) => void} onSubmit - Callback function to be called in the onSubmit event.
 * @param {(value: string) => void} onChange - Callback function to be called in the onChange event.
 * @param {boolean} [autofocus=false] - Defines if the input should be autofocused when mounted in the UI.
 * @param {string} startValue - Default value of the input.
 * @param {CSSProperties} formStyle - Object with Javascript styles to be applied to the form.
 */
const Input = ({
  value,
  placeholder = '',
  onSubmit,
  onChange,
  autofocus = false,
  startValue = '',
  formStyle,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<string>(startValue);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);

    if (onChange && typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  /***
   * The evt.preventDefault() is used to prevent the reloading of the page on the submit.
   * The submit event is used to handle the user input submit with the keyboard and different devices (compatibility).
   */
  const handleSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(inputValue);
    }
  };

  useEffect(() => {
    if (typeof value === 'string' && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue, setInputValue]);

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        value={inputValue}
        onChange={evt => handleChange(evt.target.value)}
        className={styles.formInput}
        placeholder={placeholder}
        autoFocus={autofocus}
      />
    </form>
  );
};

export default Input;
