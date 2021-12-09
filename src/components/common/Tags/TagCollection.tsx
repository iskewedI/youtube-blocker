import React from 'react';
import { Tag } from './Tag';
import TagController from './TagController';

export interface ITagCollectionProps {
  tags: Tag[];
  onTagRemove: (id: number) => void;
}

const TagCollection = ({ tags, onTagRemove }: ITagCollectionProps) => {
  return (
    <div>
      {tags.map((tag: Tag) => (
        <TagController key={tag.id} {...tag} onDelete={() => onTagRemove(tag.id)} />
      ))}
    </div>
  );
};

export default TagCollection;
