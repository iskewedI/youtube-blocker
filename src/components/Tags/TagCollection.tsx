import Tag, { ITag } from './Tag';

export interface ITagCollectionProps {
  tags: ITag[];
  onTagRemove: (id: string) => void;
}

const TagCollection = ({ tags, onTagRemove }: ITagCollectionProps) => {
  return (
    <div>
      {tags.map(tag => (
        <Tag key={tag.id} title={tag.title} onClick={() => onTagRemove(tag.id)} />
      ))}
    </div>
  );
};

export default TagCollection;
