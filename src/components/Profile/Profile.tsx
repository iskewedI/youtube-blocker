import { useState } from 'react';
import { formatTime } from '../../service/utils';
import Button from '../common/Button';
import EditableText from '../common/EditableText';
import CriteriaListController, {
  CriteraListType,
} from '../CriteriaList/CriteriaListController';
import DayPickerController from '../DayPicker/DayPickerController';
import styles from './profile.module.css';

export interface ICriteriaList {
  id: string;
  data: { option: string; value: string }[];
  type: CriteraListType;
}

interface ProfileState {
  alwaysEnabled: boolean;
  enabledInRange: {
    from: string;
    to: string;
  };
}

interface IProfileProps {
  criterias: ICriteriaList[];
  onCriteriaEdit: (id: string, type: CriteraListType) => void;
}

const Profile = ({ criterias, onCriteriaEdit }: IProfileProps) => {
  const [profileState, setProfileState] = useState<ProfileState>({
    alwaysEnabled: false,
    enabledInRange: {
      from: '00:30',
      to: '09:30',
    },
  });

  const handleAlwaysEnabledClick = () => {
    setProfileState(state => ({ ...state, alwaysEnabled: !state.alwaysEnabled }));
  };

  const handleTimeChange = (time: string, rangeType: string) => {
    const validatorRegex = /^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/g;

    const validation = validatorRegex.test(time);
    if (!validation) return;

    let formatted = formatTime(time);

    setProfileState(state => {
      const newRange = { ...state.enabledInRange };

      if (rangeType === 'from') {
        newRange.from = formatted;
      } else {
        newRange.to = formatted;
      }

      return { ...state, enabledInRange: newRange };
    });
  };

  const { alwaysEnabled, enabledInRange } = profileState;

  return (
    <div className={styles.container}>
      {criterias.map(criteria => (
        <CriteriaListController
          type={criteria.type}
          data={criteria.data}
          onEdit={() => onCriteriaEdit(criteria.id, criteria.type)}
        />
      ))}
      <div className={styles.dateTimerContainer}>
        <div
          className={`${styles.timerBtn} ${styles.timer} ${
            alwaysEnabled ? styles.btnDisabled : styles.btnEnabled
          }`}
          onClick={() => {
            alwaysEnabled && handleAlwaysEnabledClick();
          }}
        >
          <EditableText
            text={enabledInRange.from}
            enabled={!alwaysEnabled}
            onSubmit={(time: string) => handleTimeChange(time, 'from')}
          />
          -
          <EditableText
            text={enabledInRange.to}
            enabled={!alwaysEnabled}
            onSubmit={(time: string) => handleTimeChange(time, 'to')}
          />
        </div>
        <Button
          onClick={handleAlwaysEnabledClick}
          classes={`${styles.timerBtn} ${
            alwaysEnabled ? styles.btnEnabled : styles.btnDisabled
          } `}
          title='Always Enabled'
        />
        <div
          className={styles.daysContainer}
          onClick={() => {
            alwaysEnabled && handleAlwaysEnabledClick();
          }}
        >
          <DayPickerController enabled={!alwaysEnabled} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
