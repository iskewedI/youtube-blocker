import { useState } from 'react';
import { uuid } from '../../service/utils';
import DayPicker from './DayPicker';

interface DayPickerControllerProps {
  enabled?: boolean;
}

/***
 * Controller for the DayPicker. It handles the click events, and the calls/operations to the store.
 * @param {boolean} enabled - Boolean that defines if the entire component should be enabled or disabled to the end user. If disabled, the component is in grey scale and is
 * not usable
 */
const DayPickerController = ({ enabled = true }: DayPickerControllerProps) => {
  const [days, setDays] = useState<Day[]>([
    { id: uuid(), title: 'Mo', active: false },
    { id: uuid(), title: 'Tu', active: true },
    { id: uuid(), title: 'We', active: false },
    { id: uuid(), title: 'Th', active: true },
    { id: uuid(), title: 'Fr', active: true },
    { id: uuid(), title: 'Sa', active: true },
    { id: uuid(), title: 'Su', active: true },
  ]);

  /***
   * Sets the new active day by its id.
   * @param {string} id - Id of the clicked day.
   */
  const handleDayClick = (id: string) => {
    if (!enabled) return;

    const index = days.findIndex(day => day.id === id);
    if (index < 0)
      return console.error('Index not found in handleDayClick => ', index, days);

    const newDays = [...days];

    newDays[index].active = !newDays[index].active;

    setDays(newDays);
  };

  return <DayPicker days={days} onDayClick={handleDayClick} enabled={enabled} />;
};

export default DayPickerController;
