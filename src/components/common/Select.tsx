import { useState } from 'react';
import { uuid } from '../../service/utils';
import styles from './common.module.css';

interface SelectOption {
  id: string;
  title: string;
}

export interface SelectProps {
  options: SelectOption[];
  onChange?: (selected: string) => void;
}

const Select = ({ options, onChange }: SelectProps) => {
  const [currentValue, setCurrentValue] = useState<string>(options[0].id);

  const handleChange = (value: string) => {
    if (onChange && typeof onChange === 'function') {
      setCurrentValue(value);
      onChange(value);
    }
  };
  return (
    <select
      value={currentValue}
      onChange={evt => handleChange(evt.target.value)}
      className={styles.select}
    >
      {options.map(option => (
        <option key={uuid()} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default Select;
