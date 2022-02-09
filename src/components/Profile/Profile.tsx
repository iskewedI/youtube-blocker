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

interface IProfileProps {
  criterias: ICriteriaList[];
  onCriteriaEdit: (id: string) => void;
}

const Profile = ({ criterias, onCriteriaEdit }: IProfileProps) => {
  return (
    <div className={styles.container}>
      {criterias.map(criteria => (
        <CriteriaListController
          type={criteria.type}
          data={criteria.data}
          onEdit={() => onCriteriaEdit(criteria.id)}
        />
      ))}
      <div className={styles.dateTimerContainer}>
        <DayPickerController classes={styles.daysContainer} />
      </div>
    </div>
  );
};

export default Profile;
