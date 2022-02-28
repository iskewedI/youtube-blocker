import Button from '../../common/Button';
import EditableText from '../../common/EditableText';
import CriteriaListController from '../../CriteriaList/CriteriaListController';
import DayPickerController from '../../DayPicker/DayPickerController';
import { CriteriaListType, TimeRange } from '../../../types/enums';
import styles from './profile.module.css';

interface ProfileProps {
  id: string;
  criterias: CriteriaList[];
  alwaysEnabled: boolean;
  enabledFrom: string;
  enabledTo: string;
  enabledInDays: boolean[];
  onCriteriaEdit: (id: string, type: CriteriaListType) => void;
  onAlwaysEnabledClick: () => void;
  onTimeChange: (time: string, rangeType: TimeRange) => void;
}

/***
 * Renders a CriteriaList for each criteria received, a DateTime component to set the From-To range times, a button to switch on/off the Always Enabled option and a Day Picker.
 * @param {string} id - Profile ID.
 * @param {CriteriaList[]} criterias - List of criterias to render. Each one render a row with a button to edit it, its title and a button to add a new criteria.
 * @param {boolean} alwaysEnabled - Switch on/off option that determines if the profile should be always enabled or could be configured to function in specific day and times.
 * @param {string} enabledFrom - Time in HH:MM format to set the starting time to enable the profile.
 * @param {string} enabledTo - Time in HH:MM format to set the ending time to disable the profile.
 * @param {string} enabledTo - Boolean array that defines if the profile is enabled for each day.
 * @param {(id: string, type: CriteriaListType) => void} onCriteriaEdit - Callback function to be called when the onEdit of CriteriaList component is triggered.
 * @param {() => void} onAlwaysEnabledClick - Callback function to be called when the Always Enabled Button is clicked.
 * @param {(time: string, rangeType: TimeRange) => void} onTimeChange - Callback function to be called when any time range is edited.
 */
const Profile = ({
  id,
  criterias,
  alwaysEnabled,
  enabledFrom,
  enabledTo,
  enabledInDays,
  onCriteriaEdit,
  onAlwaysEnabledClick,
  onTimeChange,
}: ProfileProps) => {
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
            alwaysEnabled && onAlwaysEnabledClick();
          }}
        >
          <EditableText
            text={enabledFrom}
            enabled={!alwaysEnabled}
            onSubmit={(time: string) => onTimeChange(time, TimeRange.From)}
          />
          -
          <EditableText
            text={enabledTo}
            enabled={!alwaysEnabled}
            onSubmit={(time: string) => onTimeChange(time, TimeRange.To)}
          />
        </div>
        <Button
          onClick={onAlwaysEnabledClick}
          classes={`${styles.timerBtn} ${
            alwaysEnabled ? styles.btnEnabled : styles.btnDisabled
          } `}
          title='Always Enabled'
        />
        <div
          className={styles.daysContainer}
          onClick={() => {
            alwaysEnabled && onAlwaysEnabledClick();
          }}
        >
          <DayPickerController dayStates={enabledInDays} profileId={id} enabled={!alwaysEnabled} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
