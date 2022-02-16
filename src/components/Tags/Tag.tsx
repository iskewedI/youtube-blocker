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

/***
 * Renders a div with an EditableText inside, and a button to remove itself if the user is hovering.
 * @param {string} title - Starting value to be rendered in the tag.
 * @param {boolean} isHovering - Boolean that controls if the user is hovering the tag. If it's the case, the Delete icon will be rendered.
 * @param {boolean} isEditing - Boolean that controls if the user is currently editing the tag. If it's the case, the EditableText will render a Form/Input instead of a text.
 * @param {() => void} onHoverBtnClick - Callback function to be called when the Delete button is pressed.
 * @param {(isHover: boolean) => void} onHover - Callback function to be called when the user starts or ends a hovering action.
 * @param {() => void} onMoveOver - Callback function to be called when the user moves the cursor over the container of the component.
 * @param {() => void} onEditStart - Callback function to be called when the user starts the edition in the EditableText.
 * @param {() => void} onValueChange - Callback function to be called when the user changes the value of the tag.
 * @param {() => void} onValueSubmit - Callback function to be called when the user submit a new value for the tag.
 * @param {JSX.Element} btnIcon - Icon element to be rendered in the Delete button.
 * @param {string} classes - Optional classes to be passed to the tag container.
 */
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
