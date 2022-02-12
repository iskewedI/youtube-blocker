import TagController, { Tag } from './TagController';
import styles from './tags.module.css';

interface TagGroupProps {
  tags: Tag[];
  onTagRemove: (id: string) => void;
  onTagEdit: (id: string, newValue: string) => void;
  containerClasses?: string;
  tagsClasses?: string;
}

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
