import TagController from './TagController';
import styles from './tags.module.css';

interface TagGroupProps {
  tags: Tag[];
  onTagRemove: (id: string) => void;
  onTagEdit: (id: string, newValue: string) => void;
  containerClasses?: string;
  tagsClasses?: string;
}

/***
 * Renders a container with a Tag for each Tag item in the array parameter.
 * @param {Tag[]} tags - Array of Tags to be rendered.
 * @param {(id: string) => void} onTagRemove - Callback function to be called when the tag is removed.
 * @param {(id: string, newValue: string) => void} - Callback function to be called when the tag is edited. The ID and the new value is passed as parameters.
 * @param {string} containerClasses - Optional classes to be passed to the container of the TagGroup.
 * @param {string} tagsClasses - Optional classes to be passed to each rendered tag component.
 */
const TagGroup = ({
  tags,
  onTagRemove,
  onTagEdit,
  containerClasses,
  tagsClasses,
}: TagGroupProps) => {
  return (
    <div className={`${styles.container} ${containerClasses}`}>
      {tags.map(tag => (
        <TagController
          key={tag.id}
          title={tag.title}
          onRemove={() => onTagRemove(tag.id)}
          onEdit={(newValue: string) => onTagEdit(tag.id, newValue)}
          classes={tagsClasses}
        />
      ))}
    </div>
  );
};

export default TagGroup;
