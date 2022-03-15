import Profile from './Profile';
import { CriteriaListType, Screens, TimeRange } from '../../../types/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSelectedProfile,
  setEnabledRange,
  setProfileData,
} from '../../../store/profileReducer';
import { changeScreen } from '../../../store/screenReducer';
import { getCriterionLists } from '../../../store/criterionListReducer';
import { useMemo } from 'react';

/***
 * Controller for the Profile view. Handles the state, events functions and store calls/operations. For now, if is editing a profile, renders the CriteriaPanel too.
 */
const ProfileController = () => {
  const dispatch = useDispatch();

  const selectedProfile = useSelector(getSelectedProfile);
  const criterionLists = useSelector(getCriterionLists);

  const handleCriteriaEdit = (id: string, type: CriteriaListType) => {
    dispatch(
      setProfileData(selectedProfile.id, { isEditing: true, editingCriteriaType: type })
    );

    dispatch(changeScreen(Screens.CriteriaPanel));
  };

  const handleAlwaysEnabledClick = () => {
    dispatch(
      setProfileData(selectedProfile.id, {
        alwaysEnabled: !selectedProfile.alwaysEnabled,
      })
    );
  };

  /***
   * Used in the edit of a profile TimeRange text (From or To)
   * Does a pre validation of the input time. It does not changes to the new requested time if the string do not satisfy the HH:MM format.
   */
  const handleTimeChange = (time: string, rangeType: TimeRange) => {
    dispatch(setEnabledRange(selectedProfile.id, time, rangeType));
  };

  const profileCriterionLists = useMemo(
    () =>
      criterionLists.filter(criterion =>
        selectedProfile?.criterionListIds.includes(criterion.id)
      ),
    [criterionLists, selectedProfile?.criterionListIds]
  );

  if (!selectedProfile) return <div>Loading...</div>;

  return (
    <Profile
      id={selectedProfile.id}
      criterionList={profileCriterionLists}
      enabledFrom={selectedProfile.enabledInRange.from}
      enabledTo={selectedProfile.enabledInRange.to}
      enabledInDays={selectedProfile.enabledInDays}
      alwaysEnabled={selectedProfile.alwaysEnabled}
      onCriteriaEdit={handleCriteriaEdit}
      onAlwaysEnabledClick={handleAlwaysEnabledClick}
      onTimeChange={handleTimeChange}
    />
  );
};

export default ProfileController;
