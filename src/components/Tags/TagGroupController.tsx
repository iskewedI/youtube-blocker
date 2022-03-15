import { useDispatch, useSelector } from 'react-redux';
import { removeCriteriaTags } from '../../store/criteriaReducer';
import { editTagTitle, getTags } from '../../store/tagReducer';
import TagGroup from './TagGroup';

interface TagGroupControllerProps {
  criteria: Criteria;
  containerClasses?: string;
  tagsClasses?: string;
}

/***
 * Controller for the TagGroup component. Handles all the function events logic, and store calls/operations.
 * @param {Criteria} criteria - Criteria in which this tag group is being rendered.
 * @param {string} containerClasses - Optional classes to be passed to the TagGroup container.
 * @param {string} tagsClasses - Optional classes to be passed to each rendered tag.
 */
const TagGroupController = ({
  criteria,
  containerClasses,
  tagsClasses,
}: TagGroupControllerProps) => {
  const dispatch = useDispatch();

  const tags = useSelector(getTags);

  const currentTags = tags.filter(tag => criteria.tagIds.includes(tag.id));

  /***
   * Handles the tag removal operation with the store.
   */
  const handleTagRemove = (id: string) => {
    dispatch(removeCriteriaTags(criteria.id, [id]));
  };

  /***
   * Handles the tag edit operation with the store.
   */
  const handleTagEdit = (id: string, newValue: string) => {
    dispatch(editTagTitle(id, newValue));
  };

  return (
    <TagGroup
      tags={currentTags}
      onTagRemove={handleTagRemove}
      onTagEdit={handleTagEdit}
      containerClasses={containerClasses}
      tagsClasses={tagsClasses}
    />
  );
};

export default TagGroupController;
