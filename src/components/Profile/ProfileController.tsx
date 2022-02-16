import { useState } from 'react';
import CriteriaPanelController from '../CriteriaPanel/CriteriaPanelController';
import Profile from './Profile';
import { uuid } from '../../service/utils';
import { CriteriaListType, TimeRange } from '../../types/enums';

const criterias = [
  { id: uuid(), data: [], type: CriteriaListType.Allow },
  { id: uuid(), data: [], type: CriteriaListType.Block },
];

const sanitizeTime = (time: string) => {
  return time;
};

interface ProfilerControllerProps {
  id?: number;
}

/***
 * Controller for the Profile view. Handles the state, events functions and store calls/operations. For now, if is editing a profile, renders the CriteriaPanel too.
 * @param {number} id - Id of the Profile.
 */
const ProfileController = ({ id }: ProfilerControllerProps) => {
  const [profileState, setProfileState] = useState<ProfileState>({
    isEditing: false,
    editingProfileId: null,
    editingProfileType: null,
    alwaysEnabled: false,
    enabledInRange: {
      from: '00:30',
      to: '09:30',
    },
  });

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
    setProfileState(state => ({ ...state, alwaysEnabled: !state.alwaysEnabled }));
  };

  /***
   * Used in the edit of a profile TimeRange text (From or To)
   * Does a pre validation of the input time. It does not changes to the new requested time if the string do not satisfy the HH:MM format.
   */
  const handleTimeChange = (time: string, rangeType: TimeRange) => {
    const validatorRegex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g;

    const validation = validatorRegex.test(time);
    if (!validation) return;

    let sanitized = sanitizeTime(time);

    setProfileState(state => {
      const newRange = { ...state.enabledInRange };

      if (rangeType === TimeRange.From) {
        newRange.from = sanitized;
      } else {
        newRange.to = sanitized;
      }

      return { ...state, enabledInRange: newRange };
    });
  };

  if (profileState.isEditing) {
    return (
      <CriteriaPanelController
        type={profileState.editingProfileType || CriteriaListType.Allow}
        onDone={handleDoneEditing}
      />
    );
  }

  const {
    alwaysEnabled,
    enabledInRange: { from, to },
  } = profileState;

  return (
    <Profile
      criterias={criterias}
      enabledFrom={from}
      enabledTo={to}
      alwaysEnabled={alwaysEnabled}
      onCriteriaEdit={handleCriteriaEdit}
      onAlwaysEnabledClick={handleAlwaysEnabledClick}
      onTimeChange={handleTimeChange}
    />
  );
};

export default ProfileController;
