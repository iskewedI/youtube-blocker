import { useEffect, useState } from 'react';
import TagGroup from './TagGroup';

interface TagGroupControllerProps {
  startTags?: Tag[];
  onTagRemove?: (id: string) => void;
  containerClasses?: string;
  tagsClasses?: string;
}

/***
 * Controller for the TagGroup component. Handles all the function events logic, and store calls/operations.
 * @param {Tag[]} startTags - Start tags to be rendered. Probably will be removed.
 * @param {(id: string) => void} onTagRemove - Callback function to be called when a tag is removed. It receives the removed tag ID as first parameter.
 * @param {string} containerClasses - Optional classes to be passed to the TagGroup container.
 * @param {string} tagsClasses - Optional classes to be passed to each rendered tag.
 */
const TagGroupController = ({
  startTags = [],
  onTagRemove,
  containerClasses,
  tagsClasses,
}: TagGroupControllerProps) => {
  const [tags, setTags] = useState(startTags);

  useEffect(() => {
    setTags(startTags);
  }, [startTags]);

  /***
   * Handles the tag removal operation with the store.
   */
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

  /***
   * Handles the tag edit operation with the store.
   */
  const handleTagEdit = (id: string, newValue: string) => {
    const store = [...tags];

    const index = store.findIndex(t => t.id === id);
    if (index < 0) return console.error('Index not found at handleTagRemove');

    store[index].title = newValue;

    setTags(store);
  };

  return (
    <TagGroup
      tags={tags}
      onTagRemove={handleTagRemove}
      onTagEdit={handleTagEdit}
      containerClasses={containerClasses}
      tagsClasses={tagsClasses}
    />
  );
};

export default TagGroupController;
