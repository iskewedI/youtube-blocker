import { useEffect, useState } from 'react';
import { ITag } from './TagController';
import TagGroup from './TagGroup';

interface ITagGroupControllerProps {
  startTags?: ITag[];
  onTagRemove?: (id: string) => void;
  containerClasses?: string;
  tagsClasses?: string;
}

const TagGroupController = ({
  startTags = [],
  onTagRemove,
  containerClasses,
  tagsClasses,
}: ITagGroupControllerProps) => {
  const [tags, setTags] = useState(startTags);

  useEffect(() => {
    setTags(startTags);
  }, [startTags]);

  const handleTagRemove = (id: string) => {
    const store = [...tags];

    const index = store.findIndex(t => t.id === id);
    if (index < 0) return console.error('Index not found at handleTagRemove');

    store.splice(index, 1);

    setTags(store);

    if (onTagRemove && typeof onTagRemove === 'function') {
      onTagRemove(id);
    }
  };

  return (
    <TagGroup
      tags={tags}
      onTagRemove={handleTagRemove}
      containerClasses={containerClasses}
      tagsClasses={tagsClasses}
    />
  );
};

export default TagGroupController;
