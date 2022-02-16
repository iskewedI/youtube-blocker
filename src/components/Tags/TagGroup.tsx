import TagController, { ITag } from './TagController';
import styles from './tags.module.css';

export interface ITagGroupProps {
  tags: ITag[];
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
}: ITagGroupProps) => {
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
