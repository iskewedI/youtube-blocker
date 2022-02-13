import React, { CSSProperties, ReactElement } from 'react';
import styles from './common.module.css';

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  classes?: string;
  children?: ReactElement;
  style?: CSSProperties;
}

/***
 * Renders a common Button component with standarized classes.
 * @param {CSSProperties} style - Object with Javascript styles.
 * @param {string} classes - Aditional classes to be applied.
 * @param {string} title - Title of the button.
 * @param {ReactElement} children - Any React Element to be rendered (ex. Icons).
 * @param {() => void} onClick - Callback function to be called in the onClick event.
 */
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
