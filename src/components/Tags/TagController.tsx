import { useState } from 'react';
import Tag from './Tag';

interface ITagControllerProps {
  title: string;
  onClick: () => void;
  classes?: string;
}

export interface ITag {
  id: string;
  title: string;
}

const TagController = (props: ITagControllerProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleMouseOver = () => {
    if (isHover) return;

    setIsHover(true);
  };

  return (
    <Tag
      {...props}
      isHovering={isHover}
      onHover={handleHover}
      onMoveOver={handleMouseOver}
    />
  );
};

export default TagController;
