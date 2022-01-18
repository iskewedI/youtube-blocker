import Day from './Day';
import styles from './day_picker.module.css';
import { uuid } from '../../service/utils';

export interface IDay {
  title: string;
  active: boolean;
  id: string;
}

export interface DayPickerProps {
  onDayClick: (id: string) => void;
  days: IDay[];
}

const DayPicker = ({ onDayClick, days }: DayPickerProps) => {
  return (
    <div style={{ display: 'flex' }}>
      {days.map(day => (
        <Day
          key={uuid()}
          title={day.title}
          classes={day.active ? styles['day--active'] : ''}
          onClick={() => onDayClick(day.id)}
        />
      ))}
    </div>
  );
};

export default DayPicker;
