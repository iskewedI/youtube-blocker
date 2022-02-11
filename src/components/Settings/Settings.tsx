import Button from '../common/Button';
import DownloadIcon from '../common/icons/DownloadIcon';
import UploadIcon from '../common/icons/UploadIcon';
import styles from './settings.module.css';

interface SettingsProps {
  onCancel: () => void;
  onDone: () => void;
}

const Settings = ({ onCancel, onDone }: SettingsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileActionsContainer}>
        <div className={styles.profileAction}>
          <UploadIcon width={58} height={55} />
          <Button title='Upload Profile' classes={styles.profileActionBtn} />
        </div>
        <hr className={styles.profileSeparator} />
        <div className={styles.profileAction}>
          <DownloadIcon width={58} height={55} />
          <Button title='Download Profile' classes={styles.profileActionBtn} />
        </div>
      </div>
      <div className={styles.actionBtnContainer}>
        <Button title='Cancel' classes={styles.actionBtn} onClick={onCancel} />
        <Button title='Done' classes={styles.actionBtn} onClick={onDone} />
      </div>
    </div>
  );
};

export default Settings;
