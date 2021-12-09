import React from 'react';
import Tag from './Tag';

export interface ITagControllerProps {
  title: string;
  onDelete: () => void;
}

const TagController = ({ title, onDelete }: ITagControllerProps) => {
  return <Tag title={title} onClick={onDelete} />;
};

export default TagController;
