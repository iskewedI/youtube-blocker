import styles from './day_picker.module.css';

export interface DayProps {
  title: string;
  classes?: string;
  onClick: () => void;
}

const Day = ({ title, classes, onClick }: DayProps) => {
  return (
    <button className={`btn ${styles.day} ${classes || ''}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Day;
