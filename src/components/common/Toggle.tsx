import { useState } from 'react';
import Button from './Button';
import styles from './common.module.css';

export interface IToggleProp {
  options: string[];
  defaultActive?: Number;
  onChange?: (current: Number) => void;
}

const Toggle = ({ options, defaultActive = 0, onChange }: IToggleProp) => {
  const [active, setActive] = useState(defaultActive);

  const handleChange = (index: Number) => {
    setActive(index);

    if (onChange) return onChange(index);
  };

  return (
    <div>
      {options.map((title, index) => (
        <Button
          classes={`${styles.toggle} ${(index === active && styles.toggleActive) || ''}`}
          title={title}
          onClick={() => handleChange(index)}
        />
      ))}
    </div>
  );
};

export default Toggle;
