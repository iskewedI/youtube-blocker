import { useState } from 'react';
import styles from './common.module.css';

export interface InputProps {
  onChange?: (value: string) => void;
  placeholder?: string;
  onSubmit?: (text: string) => void;
  autofocus?: boolean;
  inputClasses?: string;
  startValue?: string;
  formStyle?: React.CSSProperties;
}

const Input = ({
  placeholder = '',
  onSubmit,
  onChange,
  autofocus = false,
  startValue = '',
  formStyle,
}: InputProps) => {
  const [value, setValue] = useState<string>(startValue);

  const handleChange = (value: string) => {
    setValue(value);

    if (onChange && typeof onChange === 'function') {
      onChange(value);
    }
  };

  const handleSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        value={value}
        onChange={evt => handleChange(evt.target.value)}
        className={styles.formInput}
        placeholder={placeholder}
        autoFocus={autofocus}
      />
    </form>
  );
};

export default Input;
