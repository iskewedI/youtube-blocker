import React from 'react';
import DeleteIcon from '../../icons/DeleteIcon';

import styles from './styles.module.css';
import globalStyles from '../../../global.module.css';

export interface ITagProps {
  title: string;
  onClick: () => void;
}

export interface Tag {
  id: number;
  title: string;
}

const Tag = ({ title, onClick }: ITagProps) => {
  return (
    <span className={styles.container}>
      {title}
      <button
        className={`${globalStyles.unestiled} ${styles.deleteIcon}`}
        onClick={onClick}
      >
        <DeleteIcon />
      </button>
    </span>
  );
};

export default Tag;
