import Day from './Day';
import styles from './day_picker.module.css';
import { uuid } from '../../service/utils';

export interface Day {
  title: string;
  active: boolean;
  id: string;
}

interface DayPickerProps {
  onDayClick: (id: string) => void;
  days: Day[];
  enabled: boolean;
}

const DayPicker = ({ onDayClick, days, enabled }: DayPickerProps) => {
  return (
    <div style={{ display: 'flex' }} className={!enabled ? styles.disabledDays : ''}>
      {days.map(day => (
        <Day
          key={uuid()}
          title={day.title}
          classes={day.active ? styles.dayActive : ''}
          onClick={() => onDayClick(day.id)}
        />
      ))}
    </div>
  );
};

export default DayPicker;
