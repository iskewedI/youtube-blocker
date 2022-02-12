import EditableText from '../common/EditableText';
import styles from './tags.module.css';

interface TagProps {
  title: string;
  isHovering: boolean;
  isEditing: boolean;
  onHoverBtnClick: () => void;
  onHover: (isHover: boolean) => void;
  onMoveOver: () => void;
  onEditStart: () => void;
  onValueChange: (newValue: string) => void;
  onValueSubmit: () => void;
  btnIcon: JSX.Element;
  classes?: string;
}

const Tag = ({
  title,
  isHovering,
  isEditing,
  onHoverBtnClick,
  onHover,
  onMoveOver,
  onEditStart,
  onValueChange,
  onValueSubmit,
  classes = '',
  btnIcon,
}: TagProps) => {
  return (
    <div
      className={`${styles.tag} ${classes}`}
      onMouseOver={onMoveOver}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <EditableText
        editing={isEditing}
        containerStyles={styles.tagTitle}
        text={title}
        onEditStart={onEditStart}
        onChange={onValueChange}
        onSubmit={onValueSubmit}
      />
      {isHovering && (
        <button className={`${styles.deleteIcon}`} onClick={onHoverBtnClick}>
          {btnIcon}
        </button>
      )}
    </div>
  );
};

export default Tag;
