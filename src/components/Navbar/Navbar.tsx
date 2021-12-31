import Button from '../common/Button';
import DeleteIcon from '../common/icons/DeleteIcon';
import DownloadIcon from '../common/icons/DownloadIcon';
import TimerIcon from '../common/icons/TimerIcon';
import Toggle from '../common/Toggle';
import styles from './navbar.module.css';

export interface INavbarProps {
  profiles: string[];
}

const Navbar = ({ profiles }: INavbarProps) => {
  return (
    <div className={styles.container}>
      <Toggle options={profiles} containerClass={styles.profilesContainer} />
      <div className={styles.buttonsContainer}>
        <Button children={<TimerIcon width={18} />} />
        <Button children={<DownloadIcon width={18} />} />
        <Button children={<DeleteIcon width={18} />} />
      </div>
    </div>
  );
};

export default Navbar;
