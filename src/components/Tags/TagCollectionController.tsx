import { useState } from 'react';
import TagCollection from './TagCollection';
import { uuid } from '../../service/utils';

const TagCollectionController = () => {
  const [tags, setTags] = useState([
    { id: uuid(), title: 'Verisatium' },
    { id: uuid(), title: 'CdeCiencia' },
    { id: uuid(), title: 'El Robot De Platón' },
  ]);

  const handleTagRemove = (id: string) => {
    const store = [...tags];

    const index = store.findIndex(t => t.id === id);
    if (index < 0) return console.error('Index not found at handleTagRemove');

    store.splice(index, 1);

    setTags(store);
  };

  return <TagCollection tags={tags} onTagRemove={handleTagRemove} />;
};

export default TagCollectionController;
