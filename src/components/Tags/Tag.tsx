import DeleteIcon from '../common/icons/DeleteIcon';
import styles from './tags.module.css';

export interface ITagProps {
  title: string;
  onClick: () => void;
}

export interface ITag {
  id: string;
  title: string;
}

const Tag = ({ title, onClick }: ITagProps) => {
  return (
    <span className={styles.container}>
      {title}
      <button className={`unstyled ${styles.deleteIcon}`} onClick={onClick}>
        <DeleteIcon />
      </button>
    </span>
  );
};

export default Tag;
