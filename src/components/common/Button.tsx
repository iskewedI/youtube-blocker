import React, { ReactElement } from 'react';
import styles from './common.module.css';

export interface IButtonProps {
  title?: string;
  onClick?: () => void;
  classes?: string;
  children?: ReactElement;
}

const Button = ({ classes = '', title = '', children, onClick }: IButtonProps) => {
  return (
    <button className={`${styles.btn} ${classes}`} onClick={onClick}>
      {title}
      {children}
    </button>
  );
};

export default Button;
