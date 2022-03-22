import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCriteriasLoaded, requestCriteria } from '../../store/criteriaReducer';
import {
  getCriterionListsLoaded,
  requestCriterionLists,
} from '../../store/criterionListReducer';
import { getUserProfilesLoaded, requestProfiles } from '../../store/profileReducer';
import { getCurrentScreen } from '../../store/screenReducer';
import { getTagsLoaded, requestTags } from '../../store/tagReducer';
import App from './App';

/***
 * Controller for the Main App component. Handles the events and most generic calls to the store.
 */
const AppController = () => {
  const dispatch = useDispatch();

  const currentScreen = useSelector(getCurrentScreen);

  const profilesLoaded = useSelector(getUserProfilesLoaded);
  const criterionListsLoaded = useSelector(getCriterionListsLoaded);
  const criteriaLoaded = useSelector(getCriteriasLoaded);
  const tagsLoaded = useSelector(getTagsLoaded);

  useEffect(() => {
    if (!profilesLoaded) {
      dispatch(requestProfiles);
    }
    if (!criterionListsLoaded) {
      dispatch(requestCriterionLists);
    }
    if (!criteriaLoaded) {
      dispatch(requestCriteria);
    }
    if (!tagsLoaded) {
      dispatch(requestTags);
    }
  }, [profilesLoaded, criterionListsLoaded, criteriaLoaded, tagsLoaded, dispatch]);

  return <App currentScreen={currentScreen} />;
};

export default AppController;
