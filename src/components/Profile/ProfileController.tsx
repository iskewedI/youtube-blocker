import { useState } from 'react';
import { uuid } from '../../service/utils';
import { CriteraListType } from '../CriteriaList/CriteriaListController';
import CriteriaPanelController from '../CriteriaPanel/CriteriaPanelController';
import Profile from './Profile';

export interface IProfilerControllerProps {
  id?: number;
}

interface IProfileState {
  isEditing: boolean;
  editingProfileId: string | null;
  editingProfileType: CriteraListType | null;
}

const criterias = [
  { id: uuid(), data: [], type: CriteraListType.Allow },
  { id: uuid(), data: [], type: CriteraListType.Block },
];

const ProfileController = ({ id }: IProfilerControllerProps) => {
  const [profileState, setProfileState] = useState<IProfileState>({
    isEditing: false,
    editingProfileId: null,
    editingProfileType: null,
  });

  const handleDoneEditing = () => {
    setProfileState(state => ({
      ...state,
      isEditing: false,
      editingProfileId: null,
      editingProfileType: null,
    }));
  };

  const handleCriteriaEdit = (id: string, type: CriteraListType) => {
    setProfileState(state => ({
      ...state,
      isEditing: true,
      editingProfileId: id,
      editingProfileType: type,
    }));
  };

  if (profileState.isEditing) {
    return (
      <CriteriaPanelController
        type={profileState.editingProfileType || CriteraListType.Allow}
        onDone={handleDoneEditing}
      />
    );
  }

  return <Profile criterias={criterias} onCriteriaEdit={handleCriteriaEdit} />;
};

export default ProfileController;
