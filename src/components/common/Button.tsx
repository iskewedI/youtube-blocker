import React, { CSSProperties, ReactElement } from 'react';
import styles from './common.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  classes?: string;
  children?: ReactElement;
  style?: CSSProperties;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ style, classes = '', title = '', children, onClick }: ButtonProps, ref) => {
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
