import { useState } from 'react';
import CrossIcon from '../common/icons/CrossIcon';
import TickIcon from '../common/icons/TickIcon';
import Tag from './Tag';

interface TagControllerProps {
  title: string;
  onRemove: () => void;
  onEdit: (newValue: string) => void;
  classes?: string;
}

/***
 * Controller for the Tag. Handles the states and function events.
 * @param {string} title - Title to be initially rendered in the tag.
 * @param {() => void} onRemove - Callback function to be called when the tag is removed.
 * @param {(newValue: string) => void} - Callback function to be called when the tag is edited. The new value is passed as first parameter.
 * @param {string} classes - Optional classes to be passed to the tag container.
 */
const TagController = ({ title, onRemove, onEdit, classes }: TagControllerProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tagValue, setTagValue] = useState(title);

  const handleHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleMouseOver = () => {
    if (isHover) return;

    setIsHover(true);
  };

  const handleTagEditStart = () => {
    setIsEditing(true);
  };

  const handleTagValueChange = (newValue: string) => {
    setTagValue(newValue);
  };

  const handleEditSubmit = () => {
    if (tagValue !== title) {
      onEdit(tagValue);
    }

    setIsEditing(false);
  };

  return (
    <Tag
      title={title}
      classes={classes}
      onHoverBtnClick={(!isEditing && onRemove) || handleEditSubmit}
      isHovering={isHover}
      isEditing={isEditing}
      onHover={handleHover}
      onMoveOver={handleMouseOver}
      onEditStart={handleTagEditStart}
      onValueChange={handleTagValueChange}
      onValueSubmit={handleEditSubmit}
      btnIcon={
        (!isEditing && <CrossIcon width={8} height={8} />) || (
          <TickIcon width={8} height={8} />
        )
      }
    />
  );
};

export default TagController;
