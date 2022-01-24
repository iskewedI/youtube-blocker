import React, { CSSProperties, ReactElement } from 'react';
import styles from './common.module.css';

export interface IButtonProps {
  title?: string;
  onClick?: () => void;
  classes?: string;
  children?: ReactElement;
  style?: CSSProperties;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ style, classes = '', title = '', children, onClick }: IButtonProps, ref) => {
    return (
      <button
        style={style}
        className={`${styles.btn} ${classes}`}
        onClick={onClick}
        ref={ref}
      >
        {title}
        {children}
      </button>
    );
  }
);

export default Button;
