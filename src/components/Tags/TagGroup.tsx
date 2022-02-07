import TagController, { ITag } from './TagController';
import styles from './tags.module.css';

export interface ITagGroupProps {
  tags: ITag[];
  onTagRemove: (id: string) => void;
  containerClasses?: string;
}

const TagGroup = ({ tags, onTagRemove, containerClasses }: ITagGroupProps) => {
  return (
    <div className={`${styles.container} ${containerClasses}`}>
      {tags.map(tag => (
        <TagController
          key={tag.id}
          title={tag.title}
          onClick={() => onTagRemove(tag.id)}
        />
      ))}
    </div>
  );
};

export default TagGroup;
