import styles from './day_picker.module.css';
import { uuid } from '../../service/utils';
import Button from '../common/Button';

interface DayPickerProps {
  days: Day[];
  onDayClick: (id: string) => void;
  enabled: boolean;
}

/***
 * Renders a container with buttons as Days
 * @param {Day[]} days - An array of Days objects, with ID, Title and Active boolean.
 * @param {(id: string) => void} onDayClick - Callback function to be called when a day is pressed. It receives the Day ID as the first arg.
 * @param {boolean} enabled - Boolean that defines if the entire component should be enabled or disabled to the end user. If disabled, the component is in grey scale and is
 * not usable
 */
const DayPicker = ({ days, onDayClick, enabled }: DayPickerProps) => {
  return (
    <div className={`${styles.container} ${!enabled ? styles.disabledDays : ''}`}>
      {days.map(day => (
        <Button
          key={uuid()}
          title={day.title}
          classes={`${styles.day} ${day.active ? styles.dayActive : ''}`}
          onClick={() => onDayClick(day.id)}
        />
      ))}
    </div>
  );
};

export default DayPicker;
