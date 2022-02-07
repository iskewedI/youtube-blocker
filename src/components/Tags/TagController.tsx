import { useState } from 'react';
import Tag from './Tag';

interface ITagControllerProps {
  title: string;
  onClick: () => void;
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

  return <Tag {...props} isHovering={isHover} onHover={handleHover} />;
};

export default TagController;
