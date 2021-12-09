import React, { useState } from 'react';
import TagCollection from './TagCollection';

const TagCollectionController = () => {
  const [tags, setTags] = useState([
    { id: 1, title: 'Verisatium' },
    { id: 2, title: 'CdeCiencia' },
    { id: 3, title: 'El Robot De Platón' },
  ]);

  const handleTagRemove = (id: Number) => {
    const store = [...tags];

    const index = store.findIndex(t => t.id === id);
    if (index < 0) return console.error('Index not found at handleTagRemove');

    store.splice(index, 1);

    setTags(store);
  };

  return <TagCollection tags={tags} onTagRemove={handleTagRemove} />;
};

export default TagCollectionController;
