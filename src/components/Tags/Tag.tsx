import CrossIcon from '../common/icons/CrossIcon';
import styles from './tags.module.css';

export interface ITagProps {
  title: string;
  isHovering: boolean;
  onClick: () => void;
  onHover: (isHover: boolean) => void;
  onMoveOver: () => void;
  classes?: string;
}

const Tag = ({
  title,
  isHovering,
  onClick,
  onHover,
  onMoveOver,
  classes = '',
}: ITagProps) => {
  return (
    <div
      className={`${styles.tag} ${classes}`}
      onMouseOver={onMoveOver}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className={styles.tagTitle}>{title}</div>
      {isHovering && (
        <button className={`${styles.deleteIcon}`} onClick={onClick}>
          <CrossIcon width={8} height={8} />
        </button>
      )}
    </div>
  );
};

export default Tag;
