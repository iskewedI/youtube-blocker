import { useState } from 'react';
import CriteriaPanelController from '../../CriteriaPanel/CriteriaPanelController';
import Profile from './Profile';
import { formatTime, uuid } from '../../../service/utils';
import { CriteriaListType, TimeRange } from '../../../types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProfile, setEnabledRange, setProfileData } from '../../../store/profileReducer';

const criterias = [
  { id: uuid(), data: [], type: CriteriaListType.Allow },
  { id: uuid(), data: [], type: CriteriaListType.Block },
];

/***
 * Controller for the Profile view. Handles the state, events functions and store calls/operations. For now, if is editing a profile, renders the CriteriaPanel too.
 */
const ProfileController = () => {
  const [profileState, setProfileState] = useState<ProfileState>({
    isEditing: false,
    editingProfileId: null,
    editingProfileType: null,
  });

  const dispatch = useDispatch();

  const selectedProfile = useSelector(getSelectedProfile);

  /***
   * Used when user ends the editing of a profile.
   * Cleans the editing profile state.
   */
  const handleDoneEditing = () => {
    setProfileState(state => ({
      ...state,
      isEditing: false,
      editingProfileId: null,
      editingProfileType: null,
    }));
  };

  const handleCriteriaEdit = (id: string, type: CriteriaListType) => {
    setProfileState(state => ({
      ...state,
      isEditing: true,
      editingProfileId: id,
      editingProfileType: type,
    }));
  };

  const handleAlwaysEnabledClick = () => {
    if(!selectedProfile) return;

    dispatch(setProfileData(selectedProfile.id, {alwaysEnabled: !selectedProfile.alwaysEnabled}));
  };

  /***
   * Used in the edit of a profile TimeRange text (From or To)
   * Does a pre validation of the input time. It does not changes to the new requested time if the string do not satisfy the HH:MM format.
   */
  const handleTimeChange = (time: string, rangeType: TimeRange) => {
    if(!selectedProfile) return;
    
    dispatch(setEnabledRange(selectedProfile.id, time, rangeType));
  };

  if(!selectedProfile) return <div>Loading...</div>;

  if (profileState.isEditing) {
    return (
      <CriteriaPanelController
        type={profileState.editingProfileType || CriteriaListType.Allow}
        onDone={handleDoneEditing}
      />
    );
  }

  const {
    id,
    alwaysEnabled,
    enabledInRange: { from, to },
    enabledInDays
  } = selectedProfile;

  return (
    <Profile
      id={id}
      criterias={criterias}
      enabledFrom={from}
      enabledTo={to}
      enabledInDays={enabledInDays}
      alwaysEnabled={alwaysEnabled}
      onCriteriaEdit={handleCriteriaEdit}
      onAlwaysEnabledClick={handleAlwaysEnabledClick}
      onTimeChange={handleTimeChange}
    />
  );
};

export default ProfileController;
