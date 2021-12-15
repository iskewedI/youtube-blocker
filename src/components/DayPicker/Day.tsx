import Button from '../common/Button';
import styles from './day_picker.module.css';

export interface DayProps {
  title: string;
  classes?: string;
  onClick: () => void;
}

const Day = ({ title, classes = '', onClick }: DayProps) => {
  return <Button classes={`${styles.day} ${classes}`} onClick={onClick} title={title} />;
};

export default Day;
